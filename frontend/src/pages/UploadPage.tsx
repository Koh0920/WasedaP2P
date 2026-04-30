import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import type { Note } from "@/types";
import { mockFaculties } from "@/data/mockData";
import { uploadNote } from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: CURRENT_YEAR - 2019 }, (_, i) => CURRENT_YEAR - i);

type UploadFormData = {
  faculty: string;
  department: string;
  courseName: string;
  professorName: string;
  year: string;
  semester: "Spring" | "Fall" | "";
  description: string;
  fileName: string;
  file: File | null;
};

// Reusable class strings
const fieldClass =
  "w-full text-sm bg-white border border-zinc-200 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-zinc-300 focus:border-transparent transition-all placeholder:text-zinc-400";

// SelectTrigger: visible border, full width, popper content below
const triggerClass =
  "w-full text-sm bg-white border border-zinc-200 rounded-lg h-auto px-3 py-2.5 data-[placeholder]:text-zinc-400 disabled:opacity-50";

export function UploadPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<UploadFormData>({
    faculty: "",
    department: "",
    courseName: "",
    professorName: "",
    year: String(CURRENT_YEAR),
    semester: "",
    description: "",
    fileName: "",
    file: null,
  });

  const availableDepartments = formData.faculty
    ? mockFaculties.find((f) => f.name === formData.faculty)?.departments ?? []
    : [];

  const availableCourses = formData.department
    ? availableDepartments.find((d) => d.name === formData.department)?.courses ?? []
    : [];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData((prev) => ({ ...prev, fileName: file.name, file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.courseName || !formData.professorName || !formData.file) {
      toast.error("Please fill in all required fields and attach a file.");
      return;
    }
    if (!formData.semester) {
      toast.error("Please select a semester.");
      return;
    }

    const fileType: Note["fileType"] = formData.fileName.endsWith(".pdf")
      ? "PDF"
      : formData.fileName.match(/\.(jpg|jpeg|png|gif)$/i)
      ? "Image"
      : "Document";

    setLoading(true);
    try {
      await uploadNote({
        courseName: formData.courseName,
        professorName: formData.professorName,
        faculty: formData.faculty,
        department: formData.department,
        year: Number(formData.year),
        semester: formData.semester as "Spring" | "Fall",
        fileType,
        fileName: formData.fileName,
        description: formData.description,
	file: formData.file!,
        uploader: {
          username: user?.username ?? "anonymous",
          id: user?.id ?? "0",
        },
      });
      toast.success("Note uploaded successfully!");
      navigate("/browse");
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-2xl font-medium text-zinc-900 mb-2">Upload notes</h1>
        <p className="text-zinc-500 text-sm">Share with the ManabiEcho community.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

          {/* Faculty + Department */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
                Faculty
              </label>
              <Select
                value={formData.faculty || undefined}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, faculty: v, department: "", courseName: "" }))
                }
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder="Select faculty" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6}>
                  {mockFaculties.map((f) => (
                    <SelectItem key={f.id} value={f.name}>{f.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
                Department
              </label>
              <Select
                value={formData.department || undefined}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, department: v, courseName: "" }))
                }
                disabled={!formData.faculty}
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6}>
                  {availableDepartments.map((d) => (
                    <SelectItem key={d.id} value={d.name}>{d.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Course */}
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
              Course <span className="text-orange-500">*</span>
            </label>
            {availableCourses.length > 0 ? (
              <Select
                value={formData.courseName || undefined}
                onValueChange={(v) => setFormData((prev) => ({ ...prev, courseName: v }))}
                disabled={!formData.department}
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6}>
                  {availableCourses.map((c) => (
                    <SelectItem key={c.id} value={c.name}>{c.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ) : (
              <input
                id="courseName"
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData((prev) => ({ ...prev, courseName: e.target.value }))}
                placeholder="e.g. Data Structures"
                className={fieldClass}
              />
            )}
          </div>

          {/* Professor */}
          <div>
            <label htmlFor="professorName" className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
              Professor <span className="text-orange-500">*</span>
            </label>
            <input
              id="professorName"
              type="text"
              value={formData.professorName}
              onChange={(e) => setFormData((prev) => ({ ...prev, professorName: e.target.value }))}
              placeholder="e.g. Prof. Tanaka"
              className={fieldClass}
            />
          </div>

          {/* Year + Semester */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
                Year <span className="text-orange-500">*</span>
              </label>
              <Select
                value={formData.year}
                onValueChange={(v) => setFormData((prev) => ({ ...prev, year: v }))}
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6}>
                  {YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)}>{y}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
                Semester <span className="text-orange-500">*</span>
              </label>
              <Select
                value={formData.semester || undefined}
                onValueChange={(v) =>
                  setFormData((prev) => ({ ...prev, semester: v as "Spring" | "Fall" }))
                }
              >
                <SelectTrigger className={triggerClass}>
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper" sideOffset={6}>
                  <SelectItem value="Spring">Spring</SelectItem>
                  <SelectItem value="Fall">Fall</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Optional — briefly describe what these notes cover"
              rows={3}
              className={`${fieldClass} resize-none`}
            />
          </div>

          {/* File upload */}
          <div>
            <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide mb-2 block">
              File <span className="text-orange-500">*</span>
            </label>
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-dashed border-zinc-200 rounded-lg cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-colors duration-150"
            >
              <Upload className="w-4 h-4 text-zinc-400 shrink-0" />
              <span className={`text-sm truncate ${formData.fileName ? "text-zinc-800" : "text-zinc-400"}`}>
                {formData.fileName || "Choose file — PDF, image, or document"}
              </span>
            </label>
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-5 py-2.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors duration-150 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-150 font-medium cursor-pointer"
            >
              {loading ? "Uploading…" : "Upload note"}
            </button>
          </div>
        </form>
    </div>
  );
}
