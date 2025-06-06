import React, { useState, useMemo } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Download, Search, Filter, DollarSign, CalendarDays, Info } from 'lucide-react';

// Sample data
const sampleTransactions = [
  { id: 'txn_1', date: '2024-07-20', description: 'Grocery Store Purchase', amount: -55.20, type: 'Debit', category: 'Groceries' },
  { id: 'txn_2', date: '2024-07-19', description: 'Salary Deposit - July', amount: 2500.00, type: 'Credit', category: 'Income' },
  { id: 'txn_3', date: '2024-07-18', description: 'Online Subscription Service', amount: -12.99, type: 'Debit', category: 'Subscriptions' },
  { id: 'txn_4', date: '2024-07-17', description: 'Restaurant - Dinner', amount: -78.50, type: 'Debit', category: 'Food & Dining' },
  { id: 'txn_5', date: '2024-07-15', description: 'ATM Withdrawal', amount: -100.00, type: 'Debit', category: 'Cash' },
  { id: 'txn_6', date: '2024-07-12', description: 'Utility Bill - Electricity', amount: -95.00, type: 'Debit', category: 'Utilities' },
  { id: 'txn_7', date: '2024-07-10', description: 'Refund from Online Store', amount: 30.00, type: 'Credit', category: 'Refunds' },
  { id: 'txn_8', date: '2024-07-05', description: 'Transfer to Savings', amount: -500.00, type: 'Debit', category: 'Transfers' },
];

const ITEMS_PER_PAGE = 5;

const AccountOverviewPage = () => {
  console.log('AccountOverviewPage loaded');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredTransactions = useMemo(() => {
    return sampleTransactions
      .filter(tx => 
        tx.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        tx.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(tx => filterType === 'all' || tx.type.toLowerCase() === filterType);
  }, [searchTerm, filterType]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const accountDetails = {
    accountName: "Primary Checking Account",
    accountNumber: "**** **** **** 1234",
    sortCode: "10-20-30",
    currentBalance: 5530.50,
    availableBalance: 5480.50,
    currency: "USD"
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavigationMenu userName="John Doe" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Account Overview</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-sky-700">{accountDetails.accountName}</h1>
          <p className="text-gray-600">Detailed view of your account activity and information.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-1 shadow-lg">
                <CardHeader className="bg-sky-600 text-white rounded-t-lg">
                    <CardTitle className="flex items-center"><DollarSign className="mr-2 h-6 w-6" /> Account Balance</CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <p className="text-4xl font-bold text-gray-800">${accountDetails.currentBalance.toFixed(2)}</p>
                    <p className="text-sm text-gray-500 mt-1">Available Balance: ${accountDetails.availableBalance.toFixed(2)}</p>
                </CardContent>
                 <CardFooter className="text-xs text-gray-500">
                    Last updated: Just now
                </CardFooter>
            </Card>
            <Card className="lg:col-span-2 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center"><Info className="mr-2 h-5 w-5 text-sky-600" /> Account Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    <div>
                        <Label htmlFor="accNumber" className="text-xs font-medium text-gray-500">Account Number</Label>
                        <p id="accNumber" className="text-lg font-semibold text-gray-700">{accountDetails.accountNumber}</p>
                    </div>
                     <div>
                        <Label htmlFor="sortCode" className="text-xs font-medium text-gray-500">Sort Code</Label>
                        <p id="sortCode" className="text-lg font-semibold text-gray-700">{accountDetails.sortCode}</p>
                    </div>
                     <div>
                        <Label htmlFor="currency" className="text-xs font-medium text-gray-500">Currency</Label>
                        <p id="currency" className="text-lg font-semibold text-gray-700">{accountDetails.currency}</p>
                    </div>
                     <div>
                        <Label htmlFor="accType" className="text-xs font-medium text-gray-500">Account Type</Label>
                        <p id="accType" className="text-lg font-semibold text-gray-700">Checking</p>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" size="sm">
                        <Download className="mr-2 h-4 w-4" /> Download Statement
                    </Button>
                 </CardFooter>
            </Card>
        </div>
        
        <Card className="shadow-xl">
          <CardHeader>
            <CardTitle className="flex items-center"><CalendarDays className="mr-2 h-5 w-5 text-sky-600" />Transaction History</CardTitle>
            <CardDescription>View and manage your recent transactions.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6 items-center">
              <div className="relative flex-grow w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="search"
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                  className="pl-10 w-full"
                />
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Select value={filterType} onValueChange={(value) => { setFilterType(value); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <Filter className="mr-2 h-4 w-4 text-gray-500" />
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="credit">Credits</SelectItem>
                    <SelectItem value="debit">Debits</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">Export</Button>
              </div>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[120px]">Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="w-[100px]">Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.length > 0 ? paginatedTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.date}</TableCell>
                    <TableCell>{tx.description}</TableCell>
                    <TableCell className="text-gray-600">{tx.category}</TableCell>
                    <TableCell className={`text-right font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {tx.amount > 0 ? '+' : ''}${Math.abs(tx.amount).toFixed(2)}
                    </TableCell>
                    <TableCell>
                        <span className={`px-2 py-1 text-xs rounded-full ${tx.type === 'Credit' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {tx.type}
                        </span>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                            No transactions found matching your criteria.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
          {totalPages > 1 && (
            <CardFooter className="flex justify-center border-t pt-4">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1);}} className={currentPage === 1 ? "pointer-events-none opacity-50" : undefined} />
                  </PaginationItem>
                  {[...Array(totalPages)].map((_, i) => {
                     // Basic pagination display logic, can be enhanced for many pages
                    if (totalPages <= 5 || (i < 2 || i > totalPages - 3) || Math.abs(i + 1 - currentPage) <=1 ) {
                        return (
                            <PaginationItem key={i}>
                                <PaginationLink href="#" isActive={currentPage === i + 1} onClick={(e) => {e.preventDefault(); handlePageChange(i + 1);}}>
                                {i + 1}
                                </PaginationLink>
                            </PaginationItem>
                        )
                    } else if ( (currentPage > 3 && i === 2) || (currentPage < totalPages - 2 && i === totalPages - 3) ) {
                         return <PaginationEllipsis key={`ellipsis-${i}`} />;
                    }
                    return null;
                  })}
                  <PaginationItem>
                    <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1);}} className={currentPage === totalPages ? "pointer-events-none opacity-50" : undefined} />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </CardFooter>
          )}
        </Card>
      </main>
    </div>
  );
};

export default AccountOverviewPage;