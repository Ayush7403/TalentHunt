import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue
} from '../ui/select';
import { toast } from 'sonner';
import { JOB_API_END_POINT } from '@/utils/constant';

const EditJob = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { companies } = useSelector(store => store.company);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    position: 0,
    companyId: ""
  });

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const { data } = await axios.get(`${JOB_API_END_POINT}/get/${id}`, {
          withCredentials: true
        });
        const job = data.job;
        setInput({
          title: job.title || "",
          description: job.description || "",
          requirements: job.requirements ? job.requirements.join(", ") : "",
          salary: job.salary || "",
          location: job.location || "",
          jobType: job.jobType || "",
          experience: job.experienceLevel || "",
          position: job.position || 0,
          companyId: job.company?._id || ""
        });
      } catch (err) {
        toast.error("Failed to fetch job");
      }
    };
    fetchJob();
  }, [id]);

  const changeHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${id}`,
        input,
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast.success("Job updated");
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-10 p-5 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-5">Edit Job</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
        <div>
          <Label>Title</Label>
          <Input
            name="title"
            value={input.title}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={input.description}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Requirements (comma-separated)</Label>
          <Input
            name="requirements"
            value={input.requirements}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Salary</Label>
          <Input
            name="salary"
            value={input.salary}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Location</Label>
          <Input
            name="location"
            value={input.location}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Job Type</Label>
          <Input
            name="jobType"
            value={input.jobType}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Experience</Label>
          <Input
            name="experience"
            value={input.experience}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Position</Label>
          <Input
            type="number"
            name="position"
            value={input.position}
            onChange={changeHandler}
          />
        </div>
        <div>
          <Label>Company</Label>
          <Select
            value={input.companyId}
            onValueChange={(val) =>
              setInput({ ...input, companyId: val })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Company" />
            </SelectTrigger>
            <SelectContent>
              {companies?.map((c) => (
                <SelectItem key={c._id} value={c._id}>
                  {c.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="col-span-2">
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Updating..." : "Update Job"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditJob;
