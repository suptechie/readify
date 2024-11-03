export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    folder: string;
}

export type ArticleDetailsProps = {
    params: Promise<{ id: string; }>;
  };