import { Edit, Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { IExtendedArticle } from "@/types/entities";
import { toast } from "@/hooks/use-toast";

type Props = {
    article: IExtendedArticle;
};

const ArticleActions = ({ article }: Props) => {
    const router = useRouter();

    const handleEdit = () => {
        router.push(`/edit-article/${article._id}`);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`/api/article/${article._id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast({
                    title: "Article deleted",
                    description: "Your article has been successfully deleted.",
                });
                router.push('/articles');
            } else {
                throw new Error('Failed to delete article');
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete the article. Please try again.",
                variant: "destructive",
            });
        }
    };
    return (
        <>
            <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="flex items-center space-x-2"
            >
                <Edit className="h-4 w-4" />
                <span>Edit</span>
            </Button>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button
                        variant="destructive"
                        size="sm"
                        className="flex items-center space-x-2"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this article?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your article.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default ArticleActions;