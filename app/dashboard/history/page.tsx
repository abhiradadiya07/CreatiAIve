"use client";
import { db } from "@/utils/db";
import { AIOutput } from "@/utils/schema";
import { currentUser } from "@clerk/nextjs/server";
import { desc, eq } from "drizzle-orm";
import React, { useEffect, useState } from "react";
import { Template } from "../_component/TemplateListSection";
import Templates from "@/app/(data)/Template";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export interface HistoryList {
  id: number;
  formData: string | null;
  aiResponse: string | null;
  templateSlug: string;
  createdBy: string | null;
  createdAt: string | null;
}
function History() {
  const [historyList, setHistoryList] = useState<HistoryList[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch("/api/history");
        const data = await response.json();

        if (data.success) {
          setHistoryList(data.data);
        } else {
          setError(data.message || "Failed to fetch history");
        }
      } catch (error) {
        setError("An error occurred while fetching history");
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const GetTemplateName = (slug: string) => {
    const template: Template | undefined = Templates.find(
      (item) => item.slug === slug
    );
    return template;
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      alert("Copied to clipboard!");
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
      <div className="bg-white border rounded-2xl mx-6 p-6">
        <h1 className="font-bold text-5xl mt-4">History</h1>
        <div className="text-gray-700 mt-3 text-md">
          Search your previously generate AI content.
        </div>
        <div className="mt-6 hidden lg:block">
          <table className="min-w-full bg-white border-2 border-gray-200">
            <thead>
              <tr className="bg-gray-200 *:py-4 *:px-5 border-b-2 text-left text-lg">
                <th>Template</th>
                <th>AI Response</th>
                <th>Date</th>
                <th>Words</th>
                <th>Copy</th>
              </tr>
            </thead>
            <tbody>
              {historyList.map((item, index) => {
                const template = GetTemplateName(item.templateSlug);
                return (
                  <tr key={index} className="*:py-3 *:px-4 border-b-2">
                    <td>
                      {template ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={template.icon}
                            alt={template.name}
                            width={40}
                            height={40}
                          />
                          <div className="text-lg">{template.name}</div>
                        </div>
                      ) : (
                        "Unknown template"
                      )}
                    </td>
                    <td>
                      <div className="whitespace-pre-wrap">
                        {item.aiResponse || "No response"}
                      </div>
                    </td>
                    <td>{item.createdAt}</td>
                    <td>
                      {item.aiResponse
                        ? item.aiResponse.split(/\s+/).length
                        : 0}
                    </td>
                    <td>
                      <Button onClick={() => handleCopy(item.aiResponse || "")}>
                        Copy
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 block lg:hidden">
          {historyList.map((item) => {
            const template = GetTemplateName(item.templateSlug);
            return (
              <div
                key={item.id}
                className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {template && (
                      <img
                        src={template.icon}
                        alt={template.name}
                        className="w-6 h-6 mr-2"
                      />
                    )}
                    <span className="font-semibold">
                      {template ? template.name : "Unknown Template"}
                    </span>
                  </div>
                  <Button onClick={() => handleCopy(item.aiResponse || "")}>
                    Copy
                  </Button>
                </div>
                <div className="mt-3 text-sm text-gray-700">
                  <div className="whitespace-pre-wrap">
                    {item.aiResponse || "No response"}
                  </div>
                </div>
                <div className="mt-3 flex justify-between text-sm text-gray-600">
                  <span>Date: {item.createdAt}</span>
                  <span>
                    Words:{" "}
                    {item.aiResponse ? item.aiResponse.split(/\s+/).length : 0}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default History;
