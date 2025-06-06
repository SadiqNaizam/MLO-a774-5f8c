import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DollarSign, Users, CalendarClock, Edit, Trash2, PlusCircle } from 'lucide-react';

// Schemas
const paymentSchema = z.object({
  fromAccount: z.string().min(1, "Please select an account"),
  toPayee: z.string().min(1, "Please select a payee"),
  amount: z.coerce.number().positive("Amount must be positive"),
  reference: z.string().optional(),
  paymentDate: z.string().min(1, "Please select a payment date"), // Should be date type
});
type PaymentFormData = z.infer<typeof paymentSchema>;

const payeeSchema = z.object({
  payeeName: z.string().min(2, "Payee name is too short"),
  accountNumber: z.string().regex(/^\d{8,12}$/, "Invalid account number"),
  sortCode: z.string().regex(/^\d{2}-\d{2}-\d{2}$/, "Invalid sort code (XX-XX-XX)"),
});
type PayeeFormData = z.infer<typeof payeeSchema>;


// Sample Data
const samplePayees = [
  { id: 'payee_1', name: 'John Smith (Electricity)', accountNumber: '****6789', sortCode: '11-22-33' },
  { id: 'payee_2', name: 'Alice Brown (Rent)', accountNumber: '****1234', sortCode: '44-55-66' },
  { id: 'payee_3', name: 'My Credit Card', accountNumber: '****5555', sortCode: '77-88-99' },
];

const sampleScheduledPayments = [
  { id: 'sch_1', payeeName: 'Alice Brown (Rent)', amount: 1200.00, nextPaymentDate: '2024-08-01', frequency: 'Monthly' },
  { id: 'sch_2', payeeName: 'Streaming Service', amount: 15.99, nextPaymentDate: '2024-07-25', frequency: 'Monthly' },
];

const PaymentsPage = () => {
  console.log('PaymentsPage loaded');
  const [payees, setPayees] = useState(samplePayees);
  const [isAddPayeeDialogOpen, setIsAddPayeeDialogOpen] = useState(false);
  
  const { control: paymentControl, handleSubmit: handlePaymentSubmit, reset: resetPaymentForm, formState: { errors: paymentErrors } } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: { fromAccount: '', toPayee: '', amount: 0, reference: '', paymentDate: new Date().toISOString().split('T')[0] }
  });

  const { control: payeeControl, handleSubmit: handlePayeeSubmit, reset: resetPayeeForm, formState: { errors: payeeErrors } } = useForm<PayeeFormData>({
    resolver: zodResolver(payeeSchema),
    defaultValues: { payeeName: '', accountNumber: '', sortCode: '' }
  });

  const onPaymentFormSubmit: SubmitHandler<PaymentFormData> = (data) => {
    console.log('Payment Data:', data);
    // Simulate API Call
    alert(`Payment of $${data.amount} to ${data.toPayee} scheduled for ${data.paymentDate}.`);
    resetPaymentForm();
  };

  const onPayeeFormSubmit: SubmitHandler<PayeeFormData> = (data) => {
    console.log('New Payee Data:', data);
    const newPayee = { id: `payee_${Date.now()}`, name: data.payeeName, accountNumber: `****${data.accountNumber.slice(-4)}`, sortCode: data.sortCode };
    setPayees(prev => [...prev, newPayee]);
    // Simulate API Call
    alert(`Payee "${data.payeeName}" added successfully.`);
    resetPayeeForm();
    setIsAddPayeeDialogOpen(false);
  };
  
  const handleDeletePayee = (payeeId: string) => {
    setPayees(prev => prev.filter(p => p.id !== payeeId));
    alert(`Payee deleted successfully.`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu userName="John Doe" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-sky-700">Payments & Transfers</h1>
          <p className="text-gray-600">Manage your payments, payees, and scheduled transfers.</p>
        </header>

        <Tabs defaultValue="make-payment" className="w-full">
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 mb-6 bg-sky-100 p-1 rounded-lg">
            <TabsTrigger value="make-payment" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                <DollarSign className="mr-2 h-5 w-5"/> Make a Payment
            </TabsTrigger>
            <TabsTrigger value="manage-payees" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                <Users className="mr-2 h-5 w-5"/> Manage Payees
            </TabsTrigger>
            <TabsTrigger value="scheduled-payments" className="data-[state=active]:bg-sky-600 data-[state=active]:text-white">
                <CalendarClock className="mr-2 h-5 w-5"/> Scheduled Payments
            </TabsTrigger>
          </TabsList>

          {/* Make a Payment Tab */}
          <TabsContent value="make-payment">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>New Payment</CardTitle>
                <CardDescription>Send money to an existing payee or make a one-off payment.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePaymentSubmit(onPaymentFormSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="fromAccount">From Account</Label>
                      <Controller
                        name="fromAccount"
                        control={paymentControl}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="fromAccount"><SelectValue placeholder="Select source account" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="checking_123">Checking (...1234) - $5,530.50</SelectItem>
                              <SelectItem value="savings_456">Savings (...5678) - $10,250.00</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {paymentErrors.fromAccount && <p className="text-red-500 text-sm mt-1">{paymentErrors.fromAccount.message}</p>}
                    </div>
                    <div>
                      <Label htmlFor="toPayee">To Payee</Label>
                       <Controller
                        name="toPayee"
                        control={paymentControl}
                        render={({ field }) => (
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="toPayee"><SelectValue placeholder="Select payee" /></SelectTrigger>
                            <SelectContent>
                              {payees.map(p => <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>)}
                              <SelectItem value="new_payee">Add New Payee...</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {paymentErrors.toPayee && <p className="text-red-500 text-sm mt-1">{paymentErrors.toPayee.message}</p>}
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="amount">Amount ($)</Label>
                    <Controller
                        name="amount"
                        control={paymentControl}
                        render={({ field }) => <Input id="amount" type="number" placeholder="0.00" {...field} />}
                    />
                    {paymentErrors.amount && <p className="text-red-500 text-sm mt-1">{paymentErrors.amount.message}</p>}
                  </div>
                   <div>
                    <Label htmlFor="paymentDate">Payment Date</Label>
                     <Controller
                        name="paymentDate"
                        control={paymentControl}
                        render={({ field }) => <Input id="paymentDate" type="date" {...field} />}
                    />
                    {paymentErrors.paymentDate && <p className="text-red-500 text-sm mt-1">{paymentErrors.paymentDate.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="reference">Reference (Optional)</Label>
                     <Controller
                        name="reference"
                        control={paymentControl}
                        render={({ field }) => <Input id="reference" placeholder="e.g., Invoice #123" {...field} />}
                    />
                  </div>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button type="button" className="w-full sm:w-auto bg-sky-600 hover:bg-sky-700 text-white" disabled={Object.keys(paymentErrors).length > 0}>
                        Review Payment
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Payment</AlertDialogTitle>
                        <AlertDialogDescription>
                          Please review the payment details before confirming. This action cannot be undone.
                          {/* Display payment details here from form state */}
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handlePaymentSubmit(onPaymentFormSubmit)} className="bg-sky-600 hover:bg-sky-700 text-white">
                          Confirm & Send
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Manage Payees Tab */}
          <TabsContent value="manage-payees">
            <Card className="shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle>Your Payees</CardTitle>
                    <CardDescription>Add, edit, or remove your saved payees.</CardDescription>
                </div>
                <AlertDialog open={isAddPayeeDialogOpen} onOpenChange={setIsAddPayeeDialogOpen}>
                    <AlertDialogTrigger asChild>
                        <Button className="bg-sky-600 hover:bg-sky-700 text-white"><PlusCircle className="mr-2 h-5 w-5"/> Add New Payee</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                        <AlertDialogTitle>Add New Payee</AlertDialogTitle>
                        <AlertDialogDescription>
                            Enter the details for the new payee.
                        </AlertDialogDescription>
                        </AlertDialogHeader>
                        <form onSubmit={handlePayeeSubmit(onPayeeFormSubmit)} className="space-y-4 py-4">
                            <div>
                                <Label htmlFor="payeeName">Payee Name</Label>
                                <Controller name="payeeName" control={payeeControl} render={({field}) => <Input id="payeeName" {...field} />} />
                                {payeeErrors.payeeName && <p className="text-red-500 text-sm mt-1">{payeeErrors.payeeName.message}</p>}
                            </div>
                             <div>
                                <Label htmlFor="accountNumber">Account Number</Label>
                                <Controller name="accountNumber" control={payeeControl} render={({field}) => <Input id="accountNumber" {...field} />} />
                                {payeeErrors.accountNumber && <p className="text-red-500 text-sm mt-1">{payeeErrors.accountNumber.message}</p>}
                            </div>
                             <div>
                                <Label htmlFor="sortCode">Sort Code (XX-XX-XX)</Label>
                                <Controller name="sortCode" control={payeeControl} render={({field}) => <Input id="sortCode" placeholder="00-00-00" {...field} />} />
                                {payeeErrors.sortCode && <p className="text-red-500 text-sm mt-1">{payeeErrors.sortCode.message}</p>}
                            </div>
                            <AlertDialogFooter>
                                <AlertDialogCancel type="button" onClick={() => { resetPayeeForm(); setIsAddPayeeDialogOpen(false); }}>Cancel</AlertDialogCancel>
                                <Button type="submit" className="bg-sky-600 hover:bg-sky-700 text-white">Add Payee</Button>
                            </AlertDialogFooter>
                        </form>
                    </AlertDialogContent>
                </AlertDialog>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Sort Code</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payees.length > 0 ? payees.map((payee) => (
                      <TableRow key={payee.id}>
                        <TableCell className="font-medium">{payee.name}</TableCell>
                        <TableCell>{payee.accountNumber}</TableCell>
                        <TableCell>{payee.sortCode}</TableCell>
                        <TableCell className="text-right space-x-2">
                          <Button variant="ghost" size="icon" className="text-sky-600 hover:text-sky-700">
                            <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                    <Trash2 className="h-4 w-4" /> <span className="sr-only">Delete</span>
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader><AlertDialogTitle>Confirm Deletion</AlertDialogTitle></AlertDialogHeader>
                                <AlertDialogDescription>Are you sure you want to delete payee "{payee.name}"? This action cannot be undone.</AlertDialogDescription>
                                <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => handleDeletePayee(payee.id)} className="bg-red-600 hover:bg-red-700 text-white">Delete</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </TableCell>
                      </TableRow>
                    )) : (
                        <TableRow><TableCell colSpan={4} className="text-center text-gray-500 py-4">No payees found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Scheduled Payments Tab */}
          <TabsContent value="scheduled-payments">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>Scheduled & Recurring Payments</CardTitle>
                <CardDescription>View and manage your upcoming and recurring transactions.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payee Name</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Next Payment Date</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleScheduledPayments.length > 0 ? sampleScheduledPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell className="font-medium">{payment.payeeName}</TableCell>
                        <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                        <TableCell>{payment.nextPaymentDate}</TableCell>
                        <TableCell>{payment.frequency}</TableCell>
                        <TableCell className="text-right space-x-2">
                           <Button variant="ghost" size="icon" className="text-sky-600 hover:text-sky-700">
                                <Edit className="h-4 w-4" /> <span className="sr-only">Edit</span>
                            </Button>
                           <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600">
                                <Trash2 className="h-4 w-4" /> <span className="sr-only">Cancel</span>
                            </Button>
                        </TableCell>
                      </TableRow>
                    )) : (
                         <TableRow><TableCell colSpan={5} className="text-center text-gray-500 py-4">No scheduled payments found.</TableCell></TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
               <CardFooter>
                    <Button className="bg-sky-600 hover:bg-sky-700 text-white">
                        <PlusCircle className="mr-2 h-5 w-5"/> Set Up New Recurring Payment
                    </Button>
                </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default PaymentsPage;