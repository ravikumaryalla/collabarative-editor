"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { useMutation, usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";

const templates = [
  {
    id: 1,
    label: "Blank Document",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924009/blank-document_rocwnn.svg",
    initialContent: "<p></p>",
  },
  {
    id: 2,
    label: "Business Letter",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924121/business-letter_tzbzbo.svg",
    initialContent: `
      <p>[Your Company Name]<br/>[Address Line 1]<br/>[City, State, ZIP]</p>
      <p>[Date]</p>
      <p>[Recipient Name]<br/>[Recipient Title]<br/>[Company Name]<br/>[Address Line 1]<br/>[City, State, ZIP]</p>
      <p><strong>Subject:</strong> [Business Subject]</p>
      <p>Dear [Recipient Name],</p>
      <p>We are writing to inform you about [purpose of the letter].</p>
      <p>We look forward to your response.</p>
      <p>Sincerely,<br/><br/>[Your Name]<br/>[Your Position]<br/>[Your Contact Info]</p>
    `,
  },
  {
    id: 3,
    label: "Cover Letter",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924176/cover-letter_lq2mu0.svg",
    initialContent: `
      <p>[Your Name]<br/>[Your Address]<br/>[City, State, ZIP]<br/>[Email Address]<br/>[Phone Number]</p>
      <p>[Date]</p>
      <p>[Hiring Manager’s Name]<br/>[Company Name]<br/>[Company Address]</p>
      <p>Dear [Hiring Manager’s Name],</p>
      <p>I am excited to apply for the [Job Title] position at [Company Name]. My experience in [skills/industry] aligns with your company’s mission to [goal].</p>
      <p>In my previous role at [Previous Company], I [mention a key achievement].</p>
      <p>Thank you for considering my application.</p>
      <p>Sincerely,<br/><br/>[Your Name]</p>
    `,
  },
  {
    id: 4,
    label: "Letter",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924267/letter.svg",
    initialContent: `
      <p>[Your Name]<br/>[Your Address]<br/>[City, State, ZIP]<br/>[Email Address]</p>
      <p>[Date]</p>
      <p>[Recipient Name]<br/>[Company Name]<br/>[Company Address]</p>
      <p>Dear [Recipient Name],</p>
      <p>I hope this message finds you well. I am writing to [state your purpose briefly].</p>
      <p>[Add body paragraphs here.]</p>
      <p>Sincerely,<br/><br/>[Your Name]</p>
    `,
  },
  {
    id: 5,
    label: "Resume",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924320/resume.svg",
    initialContent: `
      <h1>[Your Full Name]</h1>
      <p><strong>Email:</strong> you@example.com | <strong>Phone:</strong> +91-XXXXXXXXXX | <strong>Location:</strong> [City]</p>
      <hr/>
      <h2>Professional Summary</h2>
      <p>Passionate full-stack developer with hands-on experience in MERN stack and scalable web app development.</p>
      <h2>Experience</h2>
      <h3>Software Engineer – [Company Name]</h3>
      <p><em>[Start Date] – [End Date]</em></p>
      <ul>
        <li>Developed and maintained full-stack applications.</li>
        <li>Optimized APIs and deployed using Docker & AWS.</li>
      </ul>
      <h2>Skills</h2>
      <p>JavaScript, React, Node.js, MongoDB, Express, AWS, Docker</p>
    `,
  },
  {
    id: 6,
    label: "Software Proposal",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762924370/software-proposal.svg",
    initialContent: `
      <h1>Software Development Proposal</h1>
      <p><strong>Prepared for:</strong> [Client Name]</p>
      <p><strong>Prepared by:</strong> [Your Name / Company]</p>
      <hr/>
      <h2>1. Introduction</h2>
      <p>We are pleased to present this proposal for software development services.</p>
      <h2>2. Project Scope</h2>
      <ul>
        <li>Requirement gathering</li>
        <li>UI/UX design</li>
        <li>Frontend & backend development</li>
        <li>Testing and deployment</li>
      </ul>
      <h2>3. Timeline & Cost</h2>
      <p><strong>Duration:</strong> [8–10 weeks]</p>
      <p><strong>Cost:</strong> [$XXXX]</p>
    `,
  },
  {
    id: 7,
    label: "Project Report",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762925561/project-report.png",
    initialContent: `
      <h1>Project Report</h1>
      <p><strong>Project Title:</strong> [Title]</p>
      <p><strong>Author:</strong> [Your Name]</p>
      <hr/>
      <h2>1. Introduction</h2>
      <p>[Brief overview of the project and objectives.]</p>
      <h2>2. Methodology</h2>
      <p>[Explain the methods or technologies used.]</p>
      <h2>3. Results & Conclusion</h2>
      <p>[Summarize the outcomes and findings.]</p>
    `,
  },
  {
    id: 8,
    label: "Meeting Minutes",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762925762/meeting.png",
    initialContent: `
      <h1>Meeting Minutes</h1>
      <p><strong>Date:</strong> [DD/MM/YYYY]</p>
      <p><strong>Attendees:</strong> [List names]</p>
      <hr/>
      <h2>Agenda</h2>
      <ul>
        <li>[Agenda item 1]</li>
        <li>[Agenda item 2]</li>
      </ul>
      <h2>Decisions</h2>
      <ul>
        <li>[Decision 1]</li>
        <li>[Decision 2]</li>
      </ul>
      <h2>Action Items</h2>
      <ul>
        <li>[Task] – [Responsible Person]</li>
      </ul>
    `,
  },
  {
    id: 9,
    label: "Invoice",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762925880/invoice.png",
    initialContent: `
      <h1>Invoice</h1>
      <p><strong>From:</strong> [Your Company Name]</p>
      <p><strong>To:</strong> [Client Name]</p>
      <hr/>
      <table>
        <tr><th>Description</th><th>Qty</th><th>Rate</th><th>Amount</th></tr>
        <tr><td>[Service 1]</td><td>1</td><td>$100</td><td>$100</td></tr>
      </table>
      <p><strong>Total:</strong> $[Amount]</p>
      <p><em>Thank you for your business!</em></p>
    `,
  },
  {
    id: 10,
    label: "Blog Post",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762925999/blog-post.png",
    initialContent: `
      <h1>[Blog Post Title]</h1>
      <p><em>by [Author Name] • [Date]</em></p>
      <hr/>
      <p>[Start with an engaging introduction about your topic.]</p>
      <h2>Subheading</h2>
      <p>[Explain key points or insights.]</p>
      <p><strong>Conclusion:</strong> [Summarize or call to action.]</p>
    `,
  },
  {
    id: 11,
    label: "Marketing Proposal",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762926095/marketing-proposal.png",
    initialContent: `
      <h1>Marketing Proposal</h1>
      <p><strong>Prepared for:</strong> [Client Name]</p>
      <p><strong>Prepared by:</strong> [Your Company Name]</p>
      <hr/>
      <h2>1. Objectives</h2>
      <p>Increase brand visibility and lead generation through targeted campaigns.</p>
      <h2>2. Strategy</h2>
      <ul>
        <li>Social media marketing</li>
        <li>Email outreach</li>
        <li>SEO optimization</li>
      </ul>
      <h2>3. Timeline</h2>
      <p>[Insert key dates and milestones]</p>
    `,
  },
  {
    id: 12,
    label: "Technical Documentation",
    imgUrl:
      "https://res.cloudinary.com/du3yydyzz/image/upload/v1762926209/documentation.png",
    initialContent: `
      <h1>API Documentation</h1>
      <p><strong>Version:</strong> 1.0.0</p>
      <hr/>
      <h2>Overview</h2>
      <p>This document describes the available API endpoints and their usage.</p>
      <h2>Authentication</h2>
      <p>All requests require an API key passed in the Authorization header.</p>
      <h2>Endpoints</h2>
      <pre><code>GET /api/v1/users</code></pre>
      <p>Returns a list of users.</p>
    `,
  },
];

const TemplateGallery = () => {
  const { results, loadMore, status } = usePaginatedQuery(
    api.document.getDocuments,
    {},
    { initialNumItems: 3 }
  );
  const [isCreating, setIsCreating] = useState(false);

  const createDocument = useMutation(api.document.createDocument);

  const handleTemplateClick = (
    title: string,
    initialContent: string | undefined
  ) => {
    setIsCreating(true);
    createDocument({
      title,
      initialContent,
    }).then((data) => {
      setIsCreating(false);
      window.open(`/documents/${data}`, "_blank");
    });
  };

  if (!results) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className={cn(
        "max-w-screen-xl mx-auto flex flex-col gap-2  px-4 py-2 h-full",
        isCreating && "pointer-events-none",
        isCreating && "opacity-50"
      )}
    >
       <h1>Start a new document</h1>
      <Carousel>
        <CarouselContent>
          {templates.map((template) => {
            return (
              <CarouselItem
                key={template.id}
                className="basis-1/2 sm:basis-1/3 lg:basis-1/5 xl:basis-1/6 2xl:basis-[14.28%] "
              >
                <div
                  className={cn(
                    "aspect-[3/4] flex flex-col gap-y-2",
                    isCreating && "pointer-events-none"
                  )}
                >
                  <button
                    onClick={() =>
                      handleTemplateClick(
                        template.label,
                        template.initialContent || undefined
                      )
                    }
                    style={{
                      backgroundImage: `url('${template.imgUrl}')`,
                      backgroundSize: "contain",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      width: "170px",
                      height: "200px",
                      opacity: isCreating ? 0.5 : 1,
                    }}
                    className="size-full hover:border-blue-500 rounded-sm border bg-white"
                  ></button>
                  <p className="text-sm font-medium truncate pl-3">
                    {template.label}
                  </p>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselNext />
        <CarouselPrevious />
      </Carousel>
    </div>
  );
};

export default TemplateGallery;
