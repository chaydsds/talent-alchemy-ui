import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Candidate {
  id: string;
  name: string;
  title: string;
  skills: string[];
  experience: number;
  education: string;
  email: string;
  phone: string;
  location: string;
  workHistory: { company: string; role: string; duration: string }[];
}

const TalentSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<Candidate[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchTalent = () => {
    // Simulate API call with loading state
    setIsLoading(true);
    
    // Mock search results - in a real app this would be from an API
    setTimeout(() => {
      setResults([
        {
          id: "1",
          name: "Jane Smith",
          title: "Senior Frontend Developer",
          skills: ["React", "TypeScript", "GraphQL"],
          experience: 5,
          education: "M.S. Computer Science",
          email: "jane.smith@example.com",
          phone: "+1 (555) 123-4567",
          location: "San Francisco, CA",
          workHistory: [
            {
              company: "Tech Solutions Inc.",
              role: "Frontend Developer",
              duration: "2018-2021"
            }
          ]
        },
        {
          id: "2",
          name: "Alex Johnson",
          title: "Full Stack Engineer",
          skills: ["React", "Node.js", "MongoDB"],
          experience: 4,
          education: "B.S. Software Engineering",
          email: "alex.johnson@example.com",
          phone: "+1 (555) 987-6543",
          location: "Austin, TX",
          workHistory: [
            {
              company: "WebDev Co",
              role: "Junior Developer",
              duration: "2019-2022"
            }
          ]
        },
        {
          id: "3",
          name: "Sam Lee",
          title: "UI/UX Designer & Developer",
          skills: ["React", "Figma", "CSS", "User Research"],
          experience: 3,
          education: "B.A. Design",
          email: "sam.lee@example.com",
          phone: "+1 (555) 456-7890",
          location: "Portland, OR",
          workHistory: [
            {
              company: "Creative Design Studio",
              role: "UI Designer",
              duration: "2020-2022"
            }
          ]
        }
      ]);
      setIsLoading(false);
    }, 1000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      searchTalent();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Talent Search</h1>
      <div className="flex items-center mb-4">
        <Input
          type="text"
          placeholder="Search for talent..."
          className="mr-2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button onClick={searchTalent} disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Searching...
            </>
          ) : (
            <>
              Search <SearchIcon className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </div>

      {results.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {results.map((candidate) => (
            <div key={candidate.id} className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold">{candidate.name}</h2>
              <p className="text-gray-600">{candidate.title}</p>
              <p className="text-sm mt-2">
                Skills: {candidate.skills.join(", ")}
              </p>
              <p className="text-sm">Experience: {candidate.experience} years</p>
              <p className="text-sm">Location: {candidate.location}</p>
              <Link to={`/candidates/${candidate.id}`}>
                <Button variant="link">View Details</Button>
              </Link>
            </div>
          ))}
        </div>
      )}

      {results.length === 0 && !isLoading && (
        <div className="text-gray-500">No results found.</div>
      )}
    </div>
  );
};

export default TalentSearch;
