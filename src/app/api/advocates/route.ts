import { advocateData } from '@/db/seed/advocates';

export async function GET() {
    const data = advocateData;
    // TODO: Database isn't setup, and typically I have an interceptor that cleans up the response by removing data
    /*
    fetchApi?.interceptors.response.use(
        response => response.data,
        err => Promise.reject(err),
       );
     */
    return Response.json(data);
}
