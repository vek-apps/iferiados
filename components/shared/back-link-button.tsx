import Image from "next/image";
import Link from "next/link";
import LinkButton from "./link-button";
import leftArrow from "../../assets/icons/left-arrow.svg";

type Props = {
  label: string;
  href: string;
};

function BackLinkButton({ label, href }: Props) {
  return (
    <Link href={href} scroll={true}>
      <LinkButton>
        <Image src={leftArrow} alt="Voltar" />
        {label}
      </LinkButton>
    </Link>
  );
}

export default BackLinkButton;
