import { and, asc, desc, ilike, SQL } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import db from '@/db';
import { advocates } from '@/db/schema';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const key = searchParams.get('key');
    const sort = searchParams.get('sort');
    const searchKey = searchParams.get('searchKey');
    const searchInput = searchParams.get('searchInput');

    let orderBy = null;
    if (key && sort) {
        orderBy = sort === 'ASC' ? asc(advocates[key]) : desc(advocates[key]);
    }
    const filters: SQL[] = [];
    if (searchKey) {
        filters.push(ilike(advocates['searchKey'], searchInput));
    }
    const data = await db.select()
        .from(advocates)
        .where(and(...filters))
        .orderBy(orderBy);

    return Response.json(data);
}
