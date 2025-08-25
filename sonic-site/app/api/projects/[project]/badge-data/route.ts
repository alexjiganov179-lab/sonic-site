import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * API route for badge data.
 *
 * This handler reads a JSON file from disk based on the project ID
 * provided in the URL.  If the file exists the contents are
 * returned as JSON; otherwise a 404 response is generated.  Storing
 * API responses as typed JSON files on disk makes it trivial to
 * extend the number of projects without modifying this handler.
 */
export async function GET(
  _request: Request,
  { params }: { params: { project: string } },
) {
  const { project } = params;
  // Construct the path to the JSON file.  Files live in the same
  // directory as this route with names like `badge-data.json`.
  const dataPath = path.join(
    process.cwd(),
    'app',
    'api',
    'projects',
    project,
    'badge-data.json',
  );
  try {
    const json = fs.readFileSync(dataPath, 'utf8');
    const data = JSON.parse(json);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: `Badge data not found for project ${project}` },
      { status: 404 },
    );
  }
}
