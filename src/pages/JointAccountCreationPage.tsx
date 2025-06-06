import React, { useState } from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import JointAccountStepper from '@/components/JointAccountStepper';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { UserPlus, UserCheck, FileText, Info } from 'lucide-react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Define schemas for each step if complex validation is needed
const inviteSchema = z.object({
  partnerEmail: z.string().email({ message: "Invalid email address" }),
});

type InviteFormData = z.infer<typeof inviteSchema>;

const applicantDetailsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters" }),
  dob: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be YYYY-MM-DD" }),
  address: z.string().min(5, { message: "Address is too short" }),
  idType: z.string().min(1, { message: "Please select an ID type" }),
  idNumber: z.string().min(5, { message: "ID number seems too short" }),
});

type ApplicantDetailsFormData = z.infer<typeof applicantDetailsSchema>;


const JointAccountCreationPage = () => {
  console.log('JointAccountCreationPage loaded');
  const [submissionStatus, setSubmissionStatus] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const { control: inviteControl, handleSubmit: handleInviteSubmit, formState: { errors: inviteErrors } } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: { partnerEmail: '' }
  });

  const { control: detailsControl, handleSubmit: handleDetailsSubmit, formState: { errors: detailsErrors } } = useForm<ApplicantDetailsFormData>({
    resolver: zodResolver(applicantDetailsSchema),
    defaultValues: { fullName: '', dob: '', address: '', idType: '', idNumber: '' }
  });

  const [consentChecked, setConsentChecked] = useState(false);


  const onInviteFormSubmit: SubmitHandler<InviteFormData> = (data) => {
    console.log('Invite Partner Data:', data);
    // Simulate API call
    alert(`Invitation sent to ${data.partnerEmail}`);
    // Proceed to next step in stepper externally if stepper controls it, or manage step state here
  };

  const onDetailsFormSubmit: SubmitHandler<ApplicantDetailsFormData> = (data) => {
    console.log('Applicant Details Data:', data);
    // Simulate API call
    alert(`Details submitted for ${data.fullName}`);
  };


  const handleFinalAccountCreation = () => {
    if (!consentChecked) {
      setSubmissionStatus({ message: 'You must agree to the terms and conditions.', type: 'error' });
      return;
    }
    console.log('Creating joint account...');
    // Simulate API call for final creation
    setSubmissionStatus({ message: 'Joint account created successfully! You will be redirected shortly.', type: 'success' });
    setTimeout(() => {
      // navigate('/dashboard'); // Or to account overview
      window.location.href = '/dashboard';
    }, 3000);
  };

  const steps = [
    {
      id: 'invite',
      title: 'Invite Partner',
      content: (
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <UserPlus className="h-8 w-8 text-sky-600 mb-2" />
            <CardTitle>Invite Co-Applicant</CardTitle>
            <CardDescription>Enter the email address of the person you want to open a joint account with.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleInviteSubmit(onInviteFormSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="partnerEmail">Partner's Email</Label>
                <Controller
                    name="partnerEmail"
                    control={inviteControl}
                    render={({ field }) => <Input id="partnerEmail" type="email" placeholder="partner@example.com" {...field} />}
                />
                {inviteErrors.partnerEmail && <p className="text-red-500 text-sm mt-1">{inviteErrors.partnerEmail.message}</p>}
              </div>
              {/* Button managed by Stepper component for "Next" */}
            </form>
             <Alert className="mt-6 bg-sky-50 border-sky-200">
                <Info className="h-4 w-4 text-sky-700" />
                <AlertTitle className="text-sky-700">What happens next?</AlertTitle>
                <AlertDescription className="text-sky-600">
                  Your partner will receive an email invitation to complete their part of the application.
                </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'your-details',
      title: 'Your Details',
      content: (
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <UserCheck className="h-8 w-8 text-sky-600 mb-2" />
            <CardTitle>Primary Applicant Details</CardTitle>
            <CardDescription>Please fill in or confirm your personal information.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleDetailsSubmit(onDetailsFormSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Controller
                    name="fullName"
                    control={detailsControl}
                    render={({ field }) => <Input id="fullName" placeholder="John Doe" {...field} />}
                />
                {detailsErrors.fullName && <p className="text-red-500 text-sm mt-1">{detailsErrors.fullName.message}</p>}
              </div>
              <div>
                <Label htmlFor="dob">Date of Birth</Label>
                 <Controller
                    name="dob"
                    control={detailsControl}
                    render={({ field }) => <Input id="dob" type="date" {...field} />}
                />
                {detailsErrors.dob && <p className="text-red-500 text-sm mt-1">{detailsErrors.dob.message}</p>}
              </div>
              <div>
                <Label htmlFor="address">Full Address</Label>
                <Controller
                    name="address"
                    control={detailsControl}
                    render={({ field }) => <Input id="address" placeholder="123 Main St, Anytown" {...field} />}
                />
                {detailsErrors.address && <p className="text-red-500 text-sm mt-1">{detailsErrors.address.message}</p>}
              </div>
              <div>
                <Label htmlFor="idType">ID Type</Label>
                <Controller
                    name="idType"
                    control={detailsControl}
                    render={({ field }) => (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger id="idType"><SelectValue placeholder="Select ID type" /></SelectTrigger>
                            <SelectContent>
                                <SelectItem value="passport">Passport</SelectItem>
                                <SelectItem value="driver_license">Driver's License</SelectItem>
                                <SelectItem value="national_id">National ID</SelectItem>
                            </SelectContent>
                        </Select>
                    )}
                />
                 {detailsErrors.idType && <p className="text-red-500 text-sm mt-1">{detailsErrors.idType.message}</p>}
              </div>
              <div>
                <Label htmlFor="idNumber">ID Number</Label>
                 <Controller
                    name="idNumber"
                    control={detailsControl}
                    render={({ field }) => <Input id="idNumber" placeholder="X1234567" {...field} />}
                />
                {detailsErrors.idNumber && <p className="text-red-500 text-sm mt-1">{detailsErrors.idNumber.message}</p>}
              </div>
               {/* Button managed by Stepper component for "Next" */}
            </form>
          </CardContent>
        </Card>
      ),
    },
    {
      id: 'review',
      title: 'Review & Agree',
      content: (
        <Card className="w-full max-w-lg mx-auto">
          <CardHeader>
            <FileText className="h-8 w-8 text-sky-600 mb-2" />
            <CardTitle>Review and Confirm</CardTitle>
            <CardDescription>Please review the details and agree to the terms.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-md bg-gray-50">
              <h4 className="font-semibold mb-2">Account Terms Summary:</h4>
              <ul className="list-disc list-inside text-sm space-y-1 text-gray-700">
                <li>Both applicants will have equal access to the account.</li>
                <li>Standard transaction fees may apply.</li>
                <li>Interest rates are subject to change.</li>
                <li>Digital statements will be provided monthly.</li>
              </ul>
            </div>
             <div className="p-4 border rounded-md bg-gray-50">
                <h4 className="font-semibold mb-2">Your (Primary Applicant) Details:</h4>
                {/* Display data from previous step, e.g., from state or form values */}
                <p className="text-sm text-gray-700">Full Name: John Doe (Placeholder)</p>
                <p className="text-sm text-gray-700">Email: john.doe@example.com (Placeholder)</p>
             </div>
             <div className="p-4 border rounded-md bg-gray-50">
                <h4 className="font-semibold mb-2">Co-Applicant Details:</h4>
                <p className="text-sm text-gray-700">Email: partner@example.com (Placeholder)</p>
                <p className="text-sm text-gray-600 italic">(Co-applicant details will appear here once they complete their part)</p>
             </div>
            <div className="flex items-center space-x-2 pt-4">
              <Checkbox id="terms" checked={consentChecked} onCheckedChange={(checked) => setConsentChecked(checked as boolean)} />
              <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                I/We agree to the <a href="/terms-and-conditions" target="_blank" className="text-sky-600 hover:underline">terms and conditions</a> for the Joint Account.
              </Label>
            </div>
          </CardContent>
           {/* Button for "Agree & Create Account" is part of Stepper, or handled here */}
        </Card>
      ),
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <NavigationMenu userName="John Doe" />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="bg-white p-6 sm:p-8 rounded-xl shadow-xl">
            <h1 className="text-3xl font-bold text-sky-700 mb-2 text-center">Open a Joint Account</h1>
            <p className="text-gray-600 mb-8 text-center">Follow these simple steps to set up your new joint account.</p>

            {submissionStatus && (
              <Alert variant={submissionStatus.type === 'success' ? 'default' : 'destructive'} className="mb-6 bg-opacity-90">
                <AlertTitle>{submissionStatus.type === 'success' ? 'Success!' : 'Error'}</AlertTitle>
                <AlertDescription>{submissionStatus.message}</AlertDescription>
              </Alert>
            )}

            <JointAccountStepper
                steps={steps}
                onComplete={handleFinalAccountCreation}
                activeColor="text-sky-600"
            />
        </div>
      </main>
       <footer className="py-6 text-center text-sm text-gray-500">
        Need help? <a href="/contact-support" className="text-sky-600 hover:underline">Contact Support</a>.
      </footer>
    </div>
  );
};

export default JointAccountCreationPage;