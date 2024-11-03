// /app/api/article/[id]/route.ts
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id

    console.log(id);
    
    
    // Your logic here
    // For example:
    // const article = await fetchArticleById(id)
    
    return NextResponse.json({ message: 'Success', id }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch article' },
      { status: 500 }
    )
  }
}