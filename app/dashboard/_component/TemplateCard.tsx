import React from "react";
import { Template } from "./TemplateListSection";
import Image from "next/image";
import Link from "next/link";

function TemplateCard(items: Template) {
  return (
    <Link href={`/dashboard/content/${items?.slug}`}>
      <div className="p-5 shadow-md rounded-md border bg-white flex flex-col gap-3 cursor-pointer hover:scale-105 transition-all">
        <Image src={items.icon} alt="icon" height={50} width={50} />
        <h2 className="font-medium text-lg">{items.name}</h2>
        <p className="text-gray-500 line-clamp-3">{items.desc}</p>
      </div>
    </Link>
  );
}

export default TemplateCard;
