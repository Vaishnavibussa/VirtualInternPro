// "use client";

// import { Suspense } from "react";

// import { useRouter, useSearchParams } from "next/navigation";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import * as z from "zod";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Form,
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useToast } from "@/hooks/use-toast";
// import { User } from "lucide-react";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// // ✅ Validation Schemas
// const studentSchema = z.object({
//   university: z.string().min(2, "University is required."),
//   major: z.string().min(2, "Major is required."),
//   graduationYear: z.string().min(4, "Invalid year."),
// });

// const pmSchema = z.object({
//   experience: z.string().min(1, "Experience is required."),
//   methodologies: z.string().min(3, "Please list at least one methodology."),
//   teamSize: z.string().min(1, "Team size is required."),
// });

// const adminSchema = z.object({
//   department: z.string().min(2, "Department is required."),
// });

// export default function CompleteProfileForm() {
//   const router = useRouter();
//   const searchParams = useSearchParams();
//   const role = searchParams.get("role") || "student";
//   const { toast } = useToast();

//   const getSchema = () => {
//     switch (role) {
//       case "pm":
//         return pmSchema;
//       case "admin":
//         return adminSchema;
//       default:
//         return studentSchema;
//     }
//   };

//   const form = useForm({
//     resolver: zodResolver(getSchema()),
//     defaultValues:
//       role === "student"
//         ? { university: "", major: "", graduationYear: "" }
//         : role === "pm"
//         ? { experience: "0-2 years", methodologies: "", teamSize: "" }
//         : { department: "" },
//   });

//   function onSubmit(values: any) {
//     console.log(values);
//     toast({
//       title: "Profile Complete!",
//       description:
//         "Next, let's assess your skills to find the perfect internship.",
//     });
//     router.push(`/onboarding/skill-assessment?role=${role}`);
//   }

//   const renderFields = () => {
//     switch (role) {
//       case "pm":
//         return (
//           <>
//             <FormField
//               control={form.control}
//               name="experience"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Years of Experience</FormLabel>
//                   <Select onValueChange={field.onChange} defaultValue={field.value}>
//                     <FormControl>
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select your experience level" />
//                       </SelectTrigger>
//                     </FormControl>
//                     <SelectContent>
//                       <SelectItem value="0-2 years">0-2 years</SelectItem>
//                       <SelectItem value="3-5 years">3-5 years</SelectItem>
//                       <SelectItem value="5+ years">5+ years</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="methodologies"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Agile Methodologies</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Scrum, Kanban" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="teamSize"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Largest Team Managed</FormLabel>
//                   <FormControl>
//                     <Input type="number" placeholder="e.g., 10" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         );
//       case "admin":
//         return (
//           <FormField
//             control={form.control}
//             name="department"
//             render={({ field }) => (
//               <FormItem>
//                 <FormLabel>Department</FormLabel>
//                 <FormControl>
//                   <Input placeholder="e.g., Platform Operations" {...field} />
//                 </FormControl>
//                 <FormMessage />
//               </FormItem>
//             )}
//           />
//         );
//       default:
//         return (
//           <>
//             <FormField
//               control={form.control}
//               name="university"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>University</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., State University" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="major"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Major</FormLabel>
//                   <FormControl>
//                     <Input placeholder="e.g., Computer Science" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//             <FormField
//               control={form.control}
//               name="graduationYear"
//               render={({ field }) => (
//                 <FormItem>
//                   <FormLabel>Graduation Year</FormLabel>
//                   <FormControl>
//                     <Input type="number" placeholder="e.g., 2026" {...field} />
//                   </FormControl>
//                   <FormMessage />
//                 </FormItem>
//               )}
//             />
//           </>
//         );
//     }
//   };

//   const getTitle = () => {
//     switch (role) {
//       case "pm":
//         return "Project Manager Profile";
//       case "admin":
//         return "Administrator Profile";
//       default:
//         return "Student Profile";
//     }
//   };

//   return (
//     <div className="flex min-h-screen items-center justify-center p-4">
//       <Card className="w-full max-w-2xl">
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <CardHeader>
//               <CardTitle className="font-headline text-2xl">
//                 Complete Your {getTitle()}
//               </CardTitle>
//               <CardDescription>
//                 Tell us a bit more about yourself to personalize your experience.
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="grid gap-6">{renderFields()}</CardContent>
//             <CardFooter>
//               <Button type="submit" className="w-full">
//                 <User className="mr-2 h-4 w-4" />
//                 Continue to Skill Assessment
//               </Button>
//             </CardFooter>
//           </form>
//         </Form>
//       </Card>
//     </div>
//   );
// }


// // export default function CompleteProfileForm() {
// //   return (
// //     <Suspense fallback={<div>Loading...</div>}>
// //       <CompleteProfileFormInner />
// //     </Suspense>
// //   );
// // }


import { Suspense } from "react";
import CompleteProfileForm from "./CompleteProfileForm";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompleteProfileForm />
    </Suspense>
  );
}
