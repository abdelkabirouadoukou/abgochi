import type { ClientStatus } from "@/generated/prisma/enums";
import { prisma } from "@/lib/db";

export type ClientDTO = {
  id: string;
  name: string;
  phone: string;
  city: string;
  message: string;
  productInterest: string;
  status: ClientStatus;
  deadline: string | null;
  notes: string;
  createdAt: string;
  files: ClientFileDTO[];
};

export type ClientFileDTO = {
  id: string;
  clientId: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: string;
};

export type ClientListItem = Omit<ClientDTO, "files" | "message" | "notes"> & {
  fileCount: number;
};

function mapFile(file: {
  id: string;
  clientId: string;
  fileUrl: string;
  fileName: string;
  uploadedAt: Date;
}): ClientFileDTO {
  return {
    id: file.id,
    clientId: file.clientId,
    fileUrl: file.fileUrl,
    fileName: file.fileName,
    uploadedAt: file.uploadedAt.toISOString(),
  };
}

function mapClient(
  client: {
    id: string;
    name: string;
    phone: string;
    city: string;
    message: string;
    productInterest: string;
    status: ClientStatus;
    deadline: Date | null;
    notes: string;
    createdAt: Date;
    files?: {
      id: string;
      clientId: string;
      fileUrl: string;
      fileName: string;
      uploadedAt: Date;
    }[];
    _count?: { files: number };
  }
): ClientDTO {
  return {
    id: client.id,
    name: client.name,
    phone: client.phone,
    city: client.city,
    message: client.message,
    productInterest: client.productInterest,
    status: client.status,
    deadline: client.deadline ? client.deadline.toISOString().slice(0, 10) : null,
    notes: client.notes ?? "",
    createdAt: client.createdAt.toISOString(),
    files: (client.files ?? []).map(mapFile),
  };
}

export async function getAllClients(status?: ClientStatus): Promise<ClientListItem[]> {
  const rows = await prisma.client.findMany({
    where: status ? { status } : undefined,
    orderBy: { createdAt: "desc" },
    include: { _count: { select: { files: true } } },
  });

  return rows.map((c) => {
    const base = mapClient(c);
    const { files: _f, message: _m, notes: _n, ...rest } = base;
    return { ...rest, fileCount: c._count.files };
  });
}

export async function getClientById(id: string): Promise<ClientDTO | null> {
  const client = await prisma.client.findUnique({
    where: { id },
    include: { files: { orderBy: { uploadedAt: "desc" } } },
  });
  if (!client) return null;
  return mapClient(client);
}

export async function createClient(data: {
  name: string;
  phone?: string;
  city?: string;
  message?: string;
  productInterest?: string;
  status?: ClientStatus;
  deadline?: string | null;
  notes?: string;
}) {
  const client = await prisma.client.create({
    data: {
      name: data.name,
      phone: data.phone ?? "",
      city: data.city ?? "",
      message: data.message ?? "",
      productInterest: data.productInterest ?? "",
      status: data.status ?? "pending",
      deadline: data.deadline ? new Date(data.deadline) : null,
      notes: data.notes ?? "",
    },
    include: { files: true },
  });
  return mapClient(client);
}

export async function updateClient(
  id: string,
  data: Partial<{
    name: string;
    phone: string;
    city: string;
    message: string;
    productInterest: string;
    status: ClientStatus;
    deadline: string | null;
    notes: string;
  }>
) {
  const client = await prisma.client.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.phone !== undefined ? { phone: data.phone } : {}),
      ...(data.city !== undefined ? { city: data.city } : {}),
      ...(data.message !== undefined ? { message: data.message } : {}),
      ...(data.productInterest !== undefined
        ? { productInterest: data.productInterest }
        : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.deadline !== undefined
        ? { deadline: data.deadline ? new Date(data.deadline) : null }
        : {}),
      ...(data.notes !== undefined ? { notes: data.notes } : {}),
    },
    include: { files: { orderBy: { uploadedAt: "desc" } } },
  });
  return mapClient(client);
}

export async function deleteClient(id: string) {
  await prisma.client.delete({ where: { id } });
}

export async function addClientFile(
  clientId: string,
  fileUrl: string,
  fileName: string
) {
  const file = await prisma.clientFile.create({
    data: { clientId, fileUrl, fileName },
  });
  return mapFile(file);
}

export async function deleteClientFile(clientId: string, fileId: string) {
  await prisma.clientFile.deleteMany({
    where: { id: fileId, clientId },
  });
}

export async function getClientStats() {
  const [total, pending, inProgress, done] = await Promise.all([
    prisma.client.count(),
    prisma.client.count({ where: { status: "pending" } }),
    prisma.client.count({ where: { status: "in_progress" } }),
    prisma.client.count({ where: { status: "done" } }),
  ]);
  return { total, pending, inProgress, done };
}
