import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  BsChevronLeft,
  BsChevronRight,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { HiOutlineArrowsUpDown } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { IoEyeOutline } from "react-icons/io5";
import { MdDeleteOutline, MdOutlineEdit } from "react-icons/md";

interface DataItem {
  id: number;
  name: string;
  email: string;
  role: "Agency Owner" | "Store Owner" | "Admin" | "User";
  status: "Subscribed" | "Unsubscribed";
}

interface SortConfig {
  key: keyof DataItem | null;
  direction: "asc" | "desc";
}

const CampaignsTable: React.FC = () => {
  const initialData: DataItem[] = Array.from({ length: 35 }, (_, index) => ({
    id: index + 1,
    name: `User ${index + 1}`,
    email: `user${index + 1}@example.com`,
    role:
      index % 3 === 0
        ? "Agency Owner"
        : index % 2 === 0
        ? "Store Owner"
        : index % 4 === 0
        ? "Admin"
        : "User",
    status: index % 2 === 0 ? "Subscribed" : "Unsubscribed",
  }));

  const [data] = useState<DataItem[]>(initialData);
  const [search, setSearch] = useState<string>("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: null,
    direction: "asc",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [openActionMenuId, setOpenActionMenuId] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  const filteredData = useMemo(() => {
    return data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  const handleSort = (key: keyof DataItem) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const paginatedData = sortedData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(Math.min(Math.max(1, page), totalPages));
  };

  const handleOptionClick = (value: number) => {
    setPageSize(value);
    setCurrentPage(1);
    setIsOpen(false);
  };

  const toggleActionMenu = (id: number) => {
    setOpenActionMenuId(openActionMenuId === id ? null : id);
  };

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleOutsideClick = (event: MouseEvent) => {
    if (
      selectRef.current &&
      !selectRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="w-full mx-auto ">
      <div className="mb-4 flex items-center justify-between">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm py-2.5 px-4 border border-gray-200 dark:border-gray-700 rounded-md outline-none focus:border-slate-600 bg-white dark:bg-slate-950"
        />
      </div>

      <div className="rounded-md border border-gray-200 dark:border-gray-700 w-full">
        <table className="w-full text-sm">
          <thead className="bg-gray-100 dark:bg-slate-800">
            <tr>
              {Object.keys(initialData[0] as DataItem).map(
                (key) =>
                  key !== "id" && (
                    <th
                      key={key}
                      className="p-3 text-left font-medium text-gray-700 dark:text-white cursor-pointer"
                      onClick={() => handleSort(key as keyof DataItem)}
                    >
                      <div className="flex items-center gap-[5px]">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                        <HiOutlineArrowsUpDown className="hover:bg-gray-200 p-[5px] rounded-md text-[1.6rem]" />
                      </div>
                    </th>
                  )
              )}
              <th className="p-3 text-left font-medium text-gray-700 dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-900"
              >
                {Object.entries(item).map(
                  ([key, value]) =>
                    key !== "id" && (
                      <td key={key} className="p-3">
                        {value}
                      </td>
                    )
                )}
                <td className="p-3 relative">
                  <BsThreeDotsVertical
                    onClick={() => toggleActionMenu(item.id)}
                    className="action-btn text-gray-600 cursor-pointer"
                  />
                  <div
                    className={`${
                      openActionMenuId === item.id
                        ? "opacity-100 scale-[1] z-30"
                        : "opacity-0 scale-[0.8] z-[-1]"
                    } absolute top-[90%] right-[80%] p-1.5 rounded-md bg-white shadow-md min-w-[160px] transition-all duration-100`}
                  >
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdOutlineEdit />
                      Edit
                    </p>
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <MdDeleteOutline />
                      Delete
                    </p>
                    <p className="flex items-center gap-[8px] text-[0.9rem] py-1.5 px-2 w-full rounded-md text-gray-700 cursor-pointer hover:bg-gray-50 transition-all duration-200">
                      <IoEyeOutline />
                      View Details
                    </p>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {!paginatedData.length && (
          <p className="text-[0.9rem] text-gray-500 py-6 text-center w-full">
            No data found!
          </p>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="flex items-center gap-[5px]">
          <div className="text-sm text-gray-500">
            Showing {(currentPage - 1) * pageSize + 1} to{" "}
            {Math.min(currentPage * pageSize, sortedData.length)} of{" "}
            {sortedData.length} results
          </div>
          <div ref={selectRef} className="relative w-44">
            <button
              onClick={handleToggle}
              className="w-max px-2 py-0.5 text-left bg-white border dark:bg-slate-900 dark:text-white border-gray-300 rounded shadow-sm flex items-center justify-between gap-[10px] hover:border-gray-400 focus:outline-none"
            >
              {pageSize}
              <IoIosArrowDown
                className={`${
                  isOpen ? "rotate-[180deg]" : "rotate-0"
                } transition-all duration-200`}
              />
            </button>
            {isOpen && (
              <div className="absolute w-max mt-1 bg-white dark:bg-slate-800 dark:text-white border border-gray-300 rounded shadow-lg">
                {[5, 10, 20, 50].map((size) => (
                  <div
                    key={size}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100  dark:hover:bg-slate-900 "
                    onClick={() => handleOptionClick(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            disabled={currentPage === 1}
          >
            <span className="sr-only">action</span>
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
                  } border border-gray-200 px-[10px] text-[0.9rem] py-[1px] rounded-md`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className={`px-3 py-1 rounded-md ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "hover:bg-gray-100 text-gray-600"
            }`}
            disabled={currentPage === totalPages}
          >
            <span className="sr-only">action</span>
            <BsChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CampaignsTable;
