/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios, { AxiosError } from "axios";
import { Trash, Upload } from "lucide-react";
import Papa from "papaparse";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Contact {
  _id: string;
  email: string;
  properties: Map<string, any>;
  dateAdded: string;
}

const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [totalChunks, setTotalChunks] = useState(0);

  const getContacts = async () => {
    try {
      const response = await axios.get("/api/contacts");
      const data = response.data as Contact[];
      setContacts(data);

      if (data.length > 0) {
        // Dynamically set headers from the first contact's properties
        const firstContactProperties = Object.keys(data[0].properties || {});
        // We'll always have email, so add it first.
        const dynamicHeaders = [
          "email",
          ...firstContactProperties,
          "dateAdded",
        ];
        setHeaders(dynamicHeaders);
      }
    } catch (error) {
      const axiosError = error as AxiosError;
      toast.error(axiosError.message);
      console.error(error);
    }
  };

  useEffect(() => {
    getContacts();
  }, []);

  const handleDeleteContact = (id: string) => {
    // TODO: Implement API call to delete contact from DB
    setContacts((prev) => prev.filter((c) => c._id !== id));
  };

  const handleOpenUploadModal = () => {
    setIsUploadModalOpen(true);
  };

  const handleCloseUploadModal = () => {
    setIsUploadModalOpen(false);
    setCsvFile(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCsvFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (!csvFile) {
      toast.error("Please select a file to upload.");
      return;
    }

    Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const parsedData = results.data as any[];
        if (parsedData.length === 0) {
          toast.error("CSV file is empty or invalid.");
          return;
        }

        const transformedData = parsedData.map((row) => {
          const { email, ...properties } = row;
          return { email, properties };
        });

        const CHUNK_SIZE = 100;
        const chunks = [];
        for (let i = 0; i < transformedData.length; i += CHUNK_SIZE) {
          chunks.push(transformedData.slice(i, i + CHUNK_SIZE));
        }

        setTotalChunks(chunks.length);
        setIsUploading(true);
        setUploadProgress(0);
        handleCloseUploadModal();

        for (let i = 0; i < chunks.length; i++) {
          try {
            await axios.post("/api/upload-contacts", chunks[i]);
            setUploadProgress(i + 1);
          } catch (error) {
            const axiosError = error as AxiosError;
            toast.error(
              `Error uploading chunk ${i + 1}: ${axiosError.message}`,
            );
            setIsUploading(false);
            return; // Stop upload on error
          }
        }

        setIsUploading(false);
        toast.success("All contacts uploaded successfully!");
        getContacts(); // Refresh the list
      },
    });
  };

  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <h1 className="mb-6 text-3xl font-bold">Contact List</h1>
        <div className="space-x-2">
          <Button onClick={handleOpenUploadModal} variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            Upload CSV
          </Button>
        </div>
      </div>

      {isUploading && (
        <div className="mb-4">
          <Label>Uploading Contacts...</Label>
          <input
            type="progress"
            min="0"
            max="100"
            value={(uploadProgress / totalChunks) * 100}
            className="w-full"
          />
          <p className="text-sm text-muted-foreground">
            Uploaded {uploadProgress} of {totalChunks} chunks.
          </p>
        </div>
      )}

      <section>
        <Card className="p-5">
          <div className="overflow-x-auto">
            <Table className="w-full border-0">
              <TableHeader>
                <TableRow>
                  {headers.map((header) => (
                    <TableHead key={header}>{header}</TableHead>
                  ))}
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact._id}>
                    {headers.map((header) => (
                      <TableCell key={header} className="font-medium">
                        {header === "email"
                          ? contact.email
                          : header === "dateAdded"
                            ? new Date(contact.dateAdded).toLocaleDateString()
                            : contact.properties.get(header)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right font-medium">
                      <div className="flex items-center gap-2">
                        <Button
                          variant={"destructive"}
                          onClick={() => handleDeleteContact(contact._id)}
                        >
                          <Trash />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={headers.length}>
                    <div className="text-right">
                      <span>Total</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    {contacts.length}
                  </TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Card>
      </section>

      <Dialog open={isUploadModalOpen} onOpenChange={handleCloseUploadModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Upload CSV</DialogTitle>
            <DialogDescription>
              Select a CSV file with contacts. The{"email"} column is required.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="csv" className="text-right">
                CSV File
              </Label>
              <Input
                id="csv"
                type="file"
                className="col-span-3"
                onChange={handleFileChange}
                accept=".csv"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleFileUpload}
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactList;
