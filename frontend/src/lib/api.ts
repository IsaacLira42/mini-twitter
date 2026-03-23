import axios from "axios";

export function getApiError(error: unknown) {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as any;

    // Normalizar detalhes de validação para um map { field: message }
    let fields: Record<string, string> | null = null;
    if (Array.isArray(data?.details)) {
      fields = {};
      data.details.forEach((d: any) => {
        if (d && d.field)
          fields![d.field] = d.message ?? String(d.message ?? "");
      });
    } else if (data?.errors && typeof data.errors === "object") {
      fields = { ...(data.errors as Record<string, string>) };
    }

    return {
      message: data?.message ?? data?.error ?? error.message,
      fields,
      status: error.response?.status ?? null,
      raw: data ?? null,
    };
  }

  return {
    message: (error as Error)?.message ?? "Erro desconhecido",
    fields: null,
    status: null,
    raw: null,
  };
}

export default getApiError;
