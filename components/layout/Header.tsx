import Image from "next/image";
import Link from "next/link";

const Header = () => {
    return (
        <header className="fixed top-0 w-full bg-black bg-opacity-50">
            <Link href={'/'}>
                <div className="flex items-center p-1">
                    <Image
                        alt="Readify"
                        width={16}
                        height={16}
                        src={'/assets/icons/books.svg'}
                        className="w-11 h-11"
                    />
                    <span className="font-bold">Readify</span>
                </div>
            </Link>
        </header>
    );
};

export default Header;