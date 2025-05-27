import { and, asc, desc, ilike, SQL } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import db from '@/db';
import { advocates } from '@/db/schema';
import { cleanPayload } from '@/app/utils/clean-payload';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const validParams = ['key', 'sort', 'searchKey', 'searchInput']; // ignores all params except for these
    const actualParams = cleanPayload({ searchParams, validParams });

    let orderBy = null;
    if (actualParams['key'] && actualParams['sort']) {
        orderBy = actualParams['sort'] === 'ASC' ? asc(advocates[actualParams['key']]) : desc(advocates[actualParams['key']]);
    }

    const filters: SQL[] = [];
    if (actualParams['searchKey'] && actualParams['searchInput']) {
        filters.push(ilike(advocates[actualParams['searchKey']], `%${actualParams['searchInput']}%`));
    }

    const data = await db
        .select()
        .from(advocates)
        .where(and(...filters))
        .orderBy(orderBy);

    console.info('data', data);
    return Response.json(data);
}
