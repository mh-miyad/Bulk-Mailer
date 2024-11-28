import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDashboardStore } from "@/Store/DashboardStore";
import { Button } from "../ui/button";

export function ContactsTable() {
  const { contacts } = useDashboardStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {contacts.map((contact) => (
          <TableRow key={contact.id}>
            <TableCell>{contact.name}</TableCell>
            <TableCell>{contact.email}</TableCell>
            <TableCell>
              <span
                className={`capitalize font-medium tracking-wider
                  ${
                    contact.status === "subscribed"
                      ? "bg-black px-4 py-2 rounded-full text-white dark:bg-white dark:text-black "
                      : ""
                  }
                    `}
              >
                {contact.status}
              </span>
            </TableCell>
            <TableCell>
              <div className="flex  gap-2 items-center">
                <Button variant={"default"} className="px-4 py-2">
                  Edit
                </Button>
                <Button variant={"destructive"} className="px-4 py-2">
                  Delete
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
