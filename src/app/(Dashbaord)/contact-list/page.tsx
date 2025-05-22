"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useRef, useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";

interface Contact {
  "Email Address": string;
  "First Name": string;
  "Last Name": string;
}

interface SortConfig {
  key: keyof Contact | null;
  direction: "asc" | "desc";
}

const contactsData = [
  {
    "Email Address": "hasnain.ali@vrcreators.co",
    "First Name": "Muhammad",
    "Last Name": "Hasnain",
  },
  {
    "Email Address": "raghavan.r@infracare.ae",
    "First Name": "",
    "Last Name": "",
  },
  {
    "Email Address": "carlos@ideasforever.net",
    "First Name": "Carlos",
    "Last Name": "Alamilla",
  },
  {
    "Email Address": "mdimachkieh@hotmail.com",
    "First Name": "",
    "Last Name": "",
  },
  {
    "Email Address": "m.khatib.1996@gmail.com",
    "First Name": "khatib",
    "Last Name": "",
  },
];
const ContactList = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });

  // Ref for dropdown
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load contacts from data.json
  useEffect(() => {
    setContacts(contactsData as Contact[]);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(
    (contact) =>
      contact["Email Address"]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      contact["First Name"].toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact["Last Name"].toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // Sort contacts based on sort config
  const sortedContacts = sortConfig.key
    ? [...filteredContacts].sort((a, b) => {
        if (a[sortConfig.key!] < b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key!] > b[sortConfig.key!]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      })
    : filteredContacts;

  // Calculate pagination
  const totalPages = Math.ceil(sortedContacts.length / pageSize);
  const paginatedContacts = sortedContacts.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  // Handle sort
  const handleSort = (key: keyof Contact) => {
    setSortConfig((prevConfig) => ({
      key,
      direction:
        prevConfig.key === key && prevConfig.direction === "asc"
          ? "desc"
          : "asc",
    }));
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="mb-6 text-3xl font-bold">Contact List</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Contacts</CardTitle>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-xs"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="w-full rounded-md border border-gray-200 dark:border-gray-700">
            <Table>
              <TableHeader className="bg-gray-100 dark:bg-slate-800">
                <TableRow>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("Email Address")}
                  >
                    <div className="flex items-center gap-[5px]">
                      Email Address
                      <HiOutlineArrowsUpDown className="rounded-md p-[5px] text-[1.6rem] hover:bg-gray-200" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("First Name")}
                  >
                    <div className="flex items-center gap-[5px]">
                      First Name
                      <HiOutlineArrowsUpDown className="rounded-md p-[5px] text-[1.6rem] hover:bg-gray-200" />
                    </div>
                  </TableHead>
                  <TableHead
                    className="cursor-pointer"
                    onClick={() => handleSort("Last Name")}
                  >
                    <div className="flex items-center gap-[5px]">
                      Last Name
                      <HiOutlineArrowsUpDown className="rounded-md p-[5px] text-[1.6rem] hover:bg-gray-200" />
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedContacts.map((contact, index) => (
                  <TableRow key={index}>
                    <TableCell>{contact["Email Address"]}</TableCell>
                    <TableCell>{contact["First Name"] || "-"}</TableCell>
                    <TableCell>{contact["Last Name"] || "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-[5px]">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * pageSize + 1} to{" "}
                {Math.min(currentPage * pageSize, sortedContacts.length)} of{" "}
                {sortedContacts.length} results
              </div>
              <div className="relative w-44" ref={dropdownRef}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex w-max items-center justify-between gap-[10px] rounded border border-gray-300 bg-white px-2 py-0.5 text-left shadow-sm hover:border-gray-400 focus:outline-none dark:bg-slate-900 dark:text-white"
                >
                  {pageSize}
                  <IoIosArrowDown
                    className={`${
                      isOpen ? "rotate-[180deg]" : "rotate-0"
                    } transition-all duration-200`}
                  />
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full z-10 mt-1 w-full rounded border border-gray-300 bg-white shadow-lg dark:border-gray-700 dark:bg-slate-900">
                    {[10, 20, 50, 100].map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setPageSize(size);
                          setCurrentPage(1);
                          setIsOpen(false);
                        }}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-slate-800"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                className={`rounded-md px-3 py-1 ${
                  currentPage === 1
                    ? "cursor-not-allowed text-gray-400"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                disabled={currentPage === 1}
              >
                <span className="sr-only">Previous</span>
                <BsChevronLeft />
              </button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum;
                  if (totalPages <= 5) {
                    pageNum = i + 1;
                  } else if (currentPage <= 3) {
                    pageNum = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + i;
                  } else {
                    pageNum = currentPage - 2 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`${
                        pageNum === currentPage &&
                        "bg-black text-white dark:bg-white dark:text-black"
                      } rounded-md border border-gray-200 px-[10px] py-[1px] text-[0.9rem]`}
                    >
                      {pageNum}
                    </button>
                  );
                })}
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                className={`rounded-md px-3 py-1 ${
                  currentPage === totalPages
                    ? "cursor-not-allowed text-gray-400"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
                disabled={currentPage === totalPages}
              >
                <span className="sr-only">Next</span>
                <BsChevronRight />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContactList;
