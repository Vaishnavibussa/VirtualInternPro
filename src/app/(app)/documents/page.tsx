
"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CircleDot, FileText, Plus, Search, Siren, TestTube2, Wind } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const initialDocuments = [
    {
      id: "doc1",
      title: "Software Requirements Specification",
      version: "1.1",
      status: "Approved",
      lastModified: "2025-01-01",
    },
    {
      id: "doc2",
      title: "Sprint 3 planning",
      version: "1.0",
      status: "Approved",
      lastModified: "2025-01-01",
    },
    {
      id: "doc3",
      title: "Test Case Repository",
      version: "1.1",
      status: "Approved",
      lastModified: "2025-01-01",
    },
    {
      id: "doc4",
      title: "Deployment Checklist",
      version: "2.1",
      status: "Approved",
      lastModified: "2025-01-01",
    },
  ];

  const templates = [
    {
      title: "SRS Template",
      description: "Standard template for documenting software requirements.",
      icon: <FileText className="w-8 h-8 text-primary" />,
    },
    {
      title: "Sprint Planning",
      description: "Template for planning and documenting sprint goals.",
      icon: <Wind className="w-8 h-8 text-primary" />,
    },
    {
      title: "Test Case Template",
      description: "Standard format for writing test cases.",
      icon: <TestTube2 className="w-8 h-8 text-primary" />,
    },
    {
      title: "Bug Report Template",
      description: "Template for reporting and tracking bugs.",
      icon: <Siren className="w-8 h-8 text-primary" />,
    },
    {
      title: "Deployment Checklist",
      description: "Comprehensive checklist for deployments.",
      icon: <CircleDot className="w-8 h-8 text-primary" />,
    },
  ];

export default function DocumentsPage() {
    const { toast } = useToast();
    const [documents, setDocuments] = useState(initialDocuments);
    const [searchQuery, setSearchQuery] = useState("");
    const [newDocTitle, setNewDocTitle] = useState("");
    const [editingDoc, setEditingDoc] = useState<(typeof initialDocuments[0]) | null>(null);
    const [isNewDocOpen, setIsNewDocOpen] = useState(false);

    const handleCreateDocument = () => {
        if (newDocTitle.trim()) {
            const newDoc = {
                id: `doc${documents.length + 1}`,
                title: newDocTitle,
                version: "1.0",
                status: "Draft",
                lastModified: new Date().toISOString().split('T')[0],
            };
            setDocuments([newDoc, ...documents]);
            toast({ title: "Document created", description: `"${newDoc.title}" has been created.` });
            setNewDocTitle("");
            setIsNewDocOpen(false);
        }
    };
    
    const handleUpdateDocument = () => {
        if (editingDoc && editingDoc.title.trim()) {
            setDocuments(documents.map(d => d.id === editingDoc.id ? editingDoc : d));
            toast({ title: "Document updated", description: `"${editingDoc.title}" has been updated.` });
            setEditingDoc(null);
        }
    };

    const handleUseTemplate = (templateTitle: string) => {
        setNewDocTitle(templateTitle.replace(" Template", ""));
        setIsNewDocOpen(true);
    }

    const filteredDocuments = documents.filter(doc =>
        doc.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold font-headline tracking-tight">
          Documentation Center
        </h1>
        <div className="flex gap-2 items-center">
            <div className="relative hidden md:block">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input 
                    placeholder="Search documents..." 
                    className="pl-8 w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <Dialog open={isNewDocOpen} onOpenChange={setIsNewDocOpen}>
                <DialogTrigger asChild>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Document
                  </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Document</DialogTitle>
                        <DialogDescription>
                            Enter a title for your new document. You can start from a template or create a blank one.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="doc-title" className="text-right">Title</Label>
                            <Input
                                id="doc-title"
                                value={newDocTitle}
                                onChange={(e) => setNewDocTitle(e.target.value)}
                                className="col-span-3"
                                placeholder="e.g. Project Plan"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button onClick={handleCreateDocument}>Create</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <FileText className="w-8 h-8 text-muted-foreground mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{doc.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>v{doc.version}</span>
                    <Badge variant="secondary" className={
                        doc.status === 'Approved' ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-300" :
                        doc.status === 'Draft' ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300" :
                        "bg-gray-100 text-gray-800 dark:bg-gray-900/50 dark:text-gray-300"
                    }>{doc.status}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Last modified: {doc.lastModified}</p>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="w-full" onClick={() => setEditingDoc({...doc})}>Edit</Button>
                    </DialogTrigger>
                     {editingDoc && editingDoc.id === doc.id && (
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Edit Document</DialogTitle>
                            </DialogHeader>
                             <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="edit-doc-title" className="text-right">Title</Label>
                                    <Input
                                        id="edit-doc-title"
                                        value={editingDoc.title}
                                        onChange={(e) => setEditingDoc({...editingDoc, title: e.target.value})}
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline" onClick={() => setEditingDoc(null)}>Cancel</Button>
                                </DialogClose>
                                <Button onClick={handleUpdateDocument}>Save Changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    )}
                </Dialog>
                <Button variant="outline" className="w-full" onClick={() => toast({ title: "Exporting document...", description: "Your document will be downloaded shortly." })}>Export</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline tracking-tight mb-6">Document Templates</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {templates.map((template, index) => (
                <Card key={index} className="text-center hover:shadow-md transition-shadow cursor-pointer" onClick={() => handleUseTemplate(template.title)}>
                    <CardContent className="p-6 flex flex-col items-center justify-center gap-3">
                        {template.icon}
                        <h4 className="font-semibold">{template.title}</h4>
                        <p className="text-xs text-muted-foreground">{template.description}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
