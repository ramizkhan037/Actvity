"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getActiveApplication, getLaptopStatus } from "@/services/laptop";
import { GenerateSummaryReportInput, generateSummaryReport } from "@/ai/flows/generate-summary-report";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Laptop {
  id: string;
  status: "online" | "offline";
  activeApplication: string;
  timestamp: string;
}

export default function Home() {
  const [laptops, setLaptops] = useState<Laptop[]>([]);
  const [newLaptopId, setNewLaptopId] = useState("");
  const { toast } = useToast();

  useEffect(() => {
    // Load initial laptop data or IDs from local storage or a config file
    const initialLaptopIds = ["laptop1", "laptop2"];
    Promise.all(initialLaptopIds.map(fetchLaptopData)).then((data) =>
      setLaptops(data)
    );
  }, []);

  const fetchLaptopData = async (id: string): Promise<Laptop> => {
    const status = await getLaptopStatus(id);
    const application = await getActiveApplication(id);
    return {
      id: id,
      status: status.status,
      activeApplication: application.name,
      timestamp: application.timestamp,
    };
  };

  const addLaptop = async () => {
    if (newLaptopId && !laptops.find((laptop) => laptop.id === newLaptopId)) {
      const newLaptop = await fetchLaptopData(newLaptopId);
      setLaptops([...laptops, newLaptop]);
      setNewLaptopId("");
    }
  };

  const generateReport = async () => {
    const laptopIds = laptops.map((laptop) => laptop.id);
    const input: GenerateSummaryReportInput = { laptopIds: laptopIds };

    try {
      const report = await generateSummaryReport(input);
      toast({
        title: "Report Generated",
        description: report.report,
      });
    } catch (error: any) {
      toast({
        title: "Error generating report",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Toaster />
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Activity Tracker</h1>
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Laptop ID"
            value={newLaptopId}
            onChange={(e) => setNewLaptopId(e.target.value)}
          />
          <Button onClick={addLaptop}>Add Laptop</Button>
          <Button variant="secondary" onClick={generateReport}>
            Generate Report
          </Button>
        </div>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {laptops.map((laptop) => (
          <Card key={laptop.id}>
            <CardHeader>
              <CardTitle>Laptop {laptop.id}</CardTitle>
              <CardDescription>
                Status:{" "}
                {laptop.status === "online" ? (
                  <Badge variant="default">Online</Badge>
                ) : (
                  <Badge variant="destructive">Offline</Badge>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                Active Application: {laptop.activeApplication}
                <br />
                Timestamp: {laptop.timestamp}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
