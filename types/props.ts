export type RootLayoutProps = Readonly<{
    children: React.ReactNode;
}>;

export interface ImageUploadProps {
    onChange: (value: string) => void;
    value: string;
    folder: string;
}