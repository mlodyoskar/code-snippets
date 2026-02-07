import { db } from '@/db'
import { usersTable, snippetsTable } from './schema'
import type { Language, Framework } from '@/lib/languages'

type SnippetSeed = {
  title: string
  code: string
  language: Language
  framework: Framework | null
  description: string
}

const snippets: SnippetSeed[] = [
  {
    title: 'React useState Hook',
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <button onClick={() => setCount(count + 1)}>
      Count: {count}
    </button>
  );
}`,
    language: 'typescript',
    framework: 'react',
    description: 'Basic useState hook example for managing component state',
  },
  {
    title: 'Express Route Handler',
    code: `import express from 'express';

const app = express();

app.get('/api/users', async (req, res) => {
  try {
    const users = await db.select().from(usersTable);
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});`,
    language: 'typescript',
    framework: 'express',
    description:
      'Basic Express.js route handler with async/await error handling',
  },
  {
    title: 'Tailwind Card Component',
    code: `<div class="max-w-sm rounded-xl overflow-hidden shadow-lg bg-white dark:bg-gray-800">
  <img class="w-full h-48 object-cover" src="/image.jpg" alt="Card image">
  <div class="px-6 py-4">
    <h2 class="font-bold text-xl mb-2 text-gray-900 dark:text-white">Card Title</h2>
    <p class="text-gray-700 dark:text-gray-300 text-base">
      Card description goes here with some sample text.
    </p>
  </div>
</div>`,
    language: 'html',
    framework: 'tailwind',
    description: 'Responsive card component with dark mode support',
  },
  {
    title: 'Python List Comprehension',
    code: `# Basic list comprehension
squares = [x**2 for x in range(10)]

# With condition
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# Nested list comprehension
matrix = [[i * j for j in range(5)] for i in range(5)]

# Dictionary comprehension
word_lengths = {word: len(word) for word in ['hello', 'world', 'python']}`,
    language: 'python',
    framework: null,
    description: 'Various Python list and dictionary comprehension patterns',
  },
  {
    title: 'Next.js API Route',
    code: `import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const id = searchParams.get('id');
  
  const data = await fetchData(id);
  
  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const result = await createItem(body);
  
  return NextResponse.json(result, { status: 201 });
}`,
    language: 'typescript',
    framework: 'nextjs',
    description: 'Next.js App Router API route with GET and POST handlers',
  },
  {
    title: 'CSS Grid Layout',
    code: `.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.grid-item {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  padding: 2rem;
  color: white;
  transition: transform 0.3s ease;
}

.grid-item:hover {
  transform: translateY(-4px);
}`,
    language: 'css',
    framework: null,
    description: 'Responsive CSS Grid layout with auto-fit and hover effects',
  },
  {
    title: 'Drizzle ORM Query',
    code: `import { db } from './db';
import { eq, and, desc, like } from 'drizzle-orm';
import { usersTable, postsTable } from './schema';

// Select with join
const usersWithPosts = await db
  .select()
  .from(usersTable)
  .leftJoin(postsTable, eq(usersTable.id, postsTable.userId))
  .where(and(
    eq(usersTable.active, true),
    like(usersTable.name, '%John%')
  ))
  .orderBy(desc(usersTable.createdAt))
  .limit(10);`,
    language: 'typescript',
    framework: 'drizzle',
    description: 'Drizzle ORM query with joins, conditions, and ordering',
  },
  {
    title: 'React Custom Hook',
    code: `import { useState, useEffect, useCallback } from 'react';

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}`,
    language: 'typescript',
    framework: 'react',
    description:
      'Custom useFetch hook with TypeScript generics and refetch capability',
  },
  {
    title: 'SQL Aggregation Query',
    code: `SELECT 
  department,
  COUNT(*) as employee_count,
  AVG(salary) as avg_salary,
  MAX(salary) as max_salary,
  MIN(salary) as min_salary
FROM employees
WHERE hire_date >= '2020-01-01'
GROUP BY department
HAVING COUNT(*) >= 5
ORDER BY avg_salary DESC;`,
    language: 'sql',
    framework: null,
    description:
      'SQL aggregation query with GROUP BY, HAVING, and multiple aggregate functions',
  },
  {
    title: 'Zod Schema Validation',
    code: `import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().int().positive().optional(),
  role: z.enum(['admin', 'user', 'guest']).default('user'),
  metadata: z.record(z.string(), z.unknown()).optional(),
  createdAt: z.coerce.date(),
});

type User = z.infer<typeof userSchema>;

// Validate data
const result = userSchema.safeParse(inputData);
if (result.success) {
  console.log(result.data);
} else {
  console.error(result.error.issues);
}`,
    language: 'typescript',
    framework: 'zod',
    description:
      'Zod schema with various validators and TypeScript type inference',
  },
]

async function seed() {
  console.log('🌱 Starting seed...')

  // First, create a user if none exists
  const existingUsers = await db.select().from(usersTable).limit(1)

  let userId: number

  if (existingUsers.length === 0) {
    console.log('Creating seed user...')
    const [newUser] = await db
      .insert(usersTable)
      .values({
        name: 'Demo User',
        email: 'demo@example.com',
      })
      .returning()
    userId = newUser.id
    console.log(`✅ Created user with id: ${userId}`)
  } else {
    userId = existingUsers[0].id
    console.log(`Using existing user with id: ${userId}`)
  }

  // Insert snippets
  console.log('Inserting snippets...')
  const insertedSnippets = await db
    .insert(snippetsTable)
    .values(snippets.map((snippet) => ({ ...snippet, userId })))
    .returning()

  console.log(`✅ Inserted ${insertedSnippets.length} snippets`)

  console.log('🎉 Seed completed successfully!')
  process.exit(0)
}

seed().catch((error) => {
  console.error('❌ Seed failed:', error)
  process.exit(1)
})
