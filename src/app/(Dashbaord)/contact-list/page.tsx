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
import { Trash } from "lucide-react";
import { useState } from "react";
import { Contact, contacts } from "./data/data";

const ContactList = () => {
  const [contact, setContacts] = useState(contacts);
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({
    id: "",
    name: "",
    email: "",
    location: "",
    dateAdded: new Date().toLocaleString(),
  });

  // Handle header checkbox toggle
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedContacts(contacts.map((contact) => contact));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (contact: Contact) => {
    setSelectedContacts((prev) =>
      prev.includes(contact)
        ? prev.filter((c) => c !== contact)
        : [...prev, contact],
    );
  };

  const handleDeleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveContact = () => {
    setContacts((prev) => [...prev, newContact]);
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between pb-5">
        <h1 className="mb-6 text-3xl font-bold">Contact List</h1>
        <div className="space-x-2">
          <Button onClick={handleOpenModal}>Add Contact</Button>
        </div>
      </div>
      <section>
        <Card className="p-5">
          <Table className="w-full border-0">
            <TableHeader>
              <TableRow>
                <TableHead className="">
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={selectedContacts.length === contacts.length}
                  />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Date Added</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contact.map((list) => (
                <TableRow key={list.id}>
                  <TableCell className="font-medium">
                    <input
                      type="checkbox"
                      checked={selectedContacts.includes(list)}
                      onChange={() => handleSelectContact(list)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{list.name}</TableCell>
                  <TableCell className="font-medium">{list.email}</TableCell>
                  <TableCell className="font-medium">
                    {list.dateAdded}
                  </TableCell>
                  <TableCell className="font-medium">{list.location}</TableCell>
                  <TableCell className="text-right font-medium">
                    <div className="flex items-center gap-2">
                      <Button
                        variant={"destructive"}
                        onClick={() => handleDeleteContact(list.id)}
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
                <TableCell colSpan={5}>
                  <div className="text-right">
                    <span>Total</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">{contacts.length}</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Card>
      </section>
      <Dialog open={isModalOpen} onOpenChange={handleCloseModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Conact </DialogTitle>
            <DialogDescription>
              {` Make changes to your profile here. Click save when you're done.`}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                onChange={(e) =>
                  setNewContact({ ...newContact, name: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                className="col-span-3"
                onChange={(e) =>
                  setNewContact({ ...newContact, email: e.target.value })
                }
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="location" className="text-right">
                Location
              </Label>
              <Input
                id="location"
                className="col-span-3"
                onChange={(e) =>
                  setNewContact({ ...newContact, location: e.target.value })
                }
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleSaveContact}>
              Save Contact
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ContactList;
