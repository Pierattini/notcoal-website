import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createLeadRepository =
  async (data: any) => {
    return prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        message: data.message,

        service: data.service,

        wants_meeting:
          data.wants_meeting,

        country_code:
          data.country_code,

        country_name:
          data.country_name,

        meetingDate:
          data.meetingDate
            ? new Date(
                data.meetingDate
              )
            : null,

        meetingSlot:
          data.meetingSlot,

        attachments:
          data.attachments,

        status:
          data.status || "Nuevo",
      },
    });
  };

export const getLeadsRepository =
  async () => {
    return prisma.lead.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
  };

export const updateLeadRepository =
  async (id: string, data: any) => {
    return prisma.lead.update({
      where: {
        id,
      },
      data,
    });
  };
