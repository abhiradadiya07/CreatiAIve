"use client"; // Mark this as a Client Component
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation"; // For programmatic navigation

export default function LandingPage() {
  const router = useRouter();

  // Handle button click to navigate to the dashboard
  const handleGetStarted = () => {
    router.push("/dashboard");
  };

  const features = [
    {
      title: "10,000 Words/Month",
      description:
        "Generate up to 10,000 words every month with our AI-powered content generator.",
    },
    {
      title: "50+ Content Templates",
      description:
        "Choose from a wide range of templates for blogs, ads, social media, and more.",
    },
    {
      title: "Unlimited Download & Copy",
      description:
        "Download or copy your generated content without any restrictions.",
    },
    {
      title: "1 Month of History",
      description:
        "Access and manage your generated content history for up to 1 month.",
    },
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href={"/"}
            className="flex justify-center items-center bg-gradient-to-r from-purple-500 to-blue-500 p-4 rounded-lg shadow-lg"
          >
            <span className="ml-2 text-3xl font-extrabold text-white drop-shadow-lg">
              Creati<span className="text-yellow-400">AI</span>ve
            </span>
          </Link>

          <Button onClick={handleGetStarted} className="py-8 text-xl">
            Get Started
          </Button>
        </div>
      </header>

      <section className="flex flex-col justify-center items-center min-h-screen text-center px-6">
        {/* Hero Content */}
        <div className="max-w-3xl mt-36">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">
            AI Content <span className="text-primary">Generator</span>
          </h1>
          <p className="text-xl mb-8">
            Revolutionize your content creation with our AI-powered app,
            delivering engaging and high-quality text in seconds.
          </p>
          <Button onClick={handleGetStarted} className="py-8 text-xl px-6">
            Get Started
          </Button>
        </div>

        {/* Features Grid */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-4xl font-bold mb-12">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition duration-300 border-2 border-primary"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
