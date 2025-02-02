"use client";
import React, { use, useContext, useState } from "react";
import FormSection from "../_component/FormSection";
import OutputSection from "../_component/OutputSection";
import { Template } from "../../_component/TemplateListSection";
import Templates from "@/app/(data)/Template";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { chatSession } from "@/utils/AiModal";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import moment from "moment";
import { TotalUsageContext } from "@/app/(context)/TotalUsageContext";
import { useRouter } from "next/router";
import { UserSubscriptionContext } from "@/app/(context)/UserSubscriptionContext";
interface ParamsType {
  "template-slug": string;
}

interface Props {
  params: Promise<ParamsType>;
}

function CreateNewContent(props: Props) {
  const params = use(props.params) as ParamsType;
  const [loading, setLoading] = useState<boolean>(false);
  const [aiOutput, setAiOutput] = useState<string>("");
  const { user } = useUser();
  const { totalUsage, setTotalUsage } = useContext(TotalUsageContext);
  const { userSubscription } = useContext(UserSubscriptionContext);
  const router = useRouter();
  const selectedTemplate: Template | undefined = Templates?.find(
    (item) => item.slug === params["template-slug"]
  );

  const GenerateAiContent = async (formData: any) => {
    if (totalUsage > 10000 && !userSubscription) {
      router.push("/dashboard/billing");
      return;
    }
    setLoading(true);
    const selectedPrompt = selectedTemplate?.aiPrompt;
    const finalAIPrompt = JSON.stringify(formData) + ", " + selectedPrompt;
    const result = await chatSession.sendMessage(finalAIPrompt);
    setAiOutput(result?.response.text());
    await saveInDb(
      JSON.stringify(formData),
      selectedTemplate?.slug,
      result?.response.text()
    );
    setLoading(false);
  };

  const saveInDb = async (formData: any, slug: any, aiResp: string) => {
    const result = await db.insert(AIOutput).values({
      formData: formData,
      templateSlug: slug,
      aiResponse: aiResp,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      createdAt: moment().format("DD/MM/yyyy"),
    });
  };
  return (
    <div className="p-5">
      <Link href={"/dashboard"}>
        <Button>
          <ArrowLeft />
          Back
        </Button>
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1 py-5">
        {/* Form Section */}
        <FormSection
          selectedTemplate={selectedTemplate}
          userFormInput={(v: any) => GenerateAiContent(v)}
          loading={loading}
        />
        <div className="col-span-2">
          <OutputSection aiOutput={aiOutput} />
        </div>
        {/* Output Section */}
      </div>
    </div>
  );
}

export default CreateNewContent;
