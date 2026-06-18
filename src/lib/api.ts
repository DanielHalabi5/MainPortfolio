import axios from 'axios';
import type { AdminUser, DashboardOverview, Message, MessageFormValues, Project, ProjectFilter, ProjectFormValues } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
  baseURL: API_BASE_URL
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export function getAdminToken() {
  return localStorage.getItem('adminToken');
}

export function clearAdminToken() {
  localStorage.removeItem('adminToken');
}

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

export async function loginAdmin(values: { email: string; password: string }) {
  const { data } = await api.post<{ token: string; admin: AdminUser }>('/auth/login', values);
  localStorage.setItem('adminToken', data.token);
  return data;
}

export async function fetchOverview() {
  const { data } = await api.get<DashboardOverview>('/admin/overview');
  return data;
}

export async function fetchMessages() {
  const { data } = await api.get<{ messages: Message[] }>('/messages');
  return data.messages;
}

export async function updateMessageRead(id: string, read: boolean) {
  const { data } = await api.patch<{ message: Message }>(`/messages/${id}`, { read });
  return data.message;
}

export async function deleteMessage(id: string) {
  await api.delete(`/messages/${id}`);
}

export async function replyToMessage(id: string, replyText: string) {
  const { data } = await api.post<{ data: Message; email: { to: string; subject: string; body: string } }>(`/messages/${id}/reply`, { replyText });
  return data;
}

function projectFormData(values: ProjectFormValues) {
  const formData = new FormData();
  formData.append('title', values.title);
  formData.append('category', values.category);
  formData.append('description', values.description);
  formData.append('technologies', values.technologies);
  formData.append('featured', String(values.featured));

  if (values.slug) formData.append('slug', values.slug);
  if (values.githubUrl) formData.append('githubUrl', values.githubUrl);
  if (values.liveUrl) formData.append('liveUrl', values.liveUrl);
  if (values.figmaUrl) formData.append('figmaUrl', values.figmaUrl);
  if (values.imageUrl) formData.append('imageUrl', values.imageUrl);
  if (values.image?.[0]) formData.append('image', values.image[0]);

  return formData;
}

export async function createProject(values: ProjectFormValues) {
  const { data } = await api.post<{ project: Project }>('/projects', projectFormData(values));
  return data.project;
}

export async function updateProject(id: string, values: ProjectFormValues) {
  const { data } = await api.put<{ project: Project }>(`/projects/${id}`, projectFormData(values));
  return data.project;
}

export async function deleteProject(id: string) {
  await api.delete(`/projects/${id}`);
}
