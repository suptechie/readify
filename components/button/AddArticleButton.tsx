'use client';

import { memo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import dynamic from "next/dynamic";
const AddArticleForm = dynamic(()=>import('@/components/forms/AddArticleForm'),{ssr:false})

const AddArticleButton = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    return (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
                <Button>Add New Article</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add New Article</DialogTitle>
                </DialogHeader>
                <AddArticleForm />
            </DialogContent>
        </Dialog>
    );
};

export default memo(AddArticleButton);