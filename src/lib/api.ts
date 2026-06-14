import axios from 'axios';
import type { MessageFormValues, Project, ProjectFilter } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL
});

export async function fetchProjects(filter: ProjectFilter = 'All') {
  const params = filter === 'All' ? undefined : { category: filter };
  const { data } = await api.get<{ projects: Project[] }>('/projects', { params });
  return data.projects;
}

export async function fetchProject(slug: string) {
  const { data } = await api.get<{ project: Project }>(`/projects/${slug}`);
  return data.project;
}

export async function sendMessage(values: MessageFormValues) {
  const { data } = await api.post('/messages', values);
  return data;
}
