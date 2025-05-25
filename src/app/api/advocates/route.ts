import db from '@/db';
import { advocates } from '@/db/schema';
import { asc, desc } from 'drizzle-orm';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    const sort = searchParams.get('sort');

    let orderBy = null;
    if (key && sort) {
        orderBy = sort === 'ASC' ? asc(advocates[key]) : desc(advocates[key]);
    }

    const data = await db.select().from(advocates).orderBy(orderBy);

    return Response.json(data);
}
