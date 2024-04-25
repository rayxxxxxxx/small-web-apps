CREATE TABLE IF NOT EXISTS "User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL UNIQUE,
    "password" TEXT NOT NULL,
    PRIMARY KEY("id")
);

CREATE TABLE IF NOT EXISTS "Post" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "tags" TEXT,
    "text" TEXT NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("userId") REFERENCES "User"("id")
);

CREATE TABLE IF NOT EXISTS "Comment" (
    "id" TEXT NOT NULL,
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    PRIMARY KEY("id"),
    FOREIGN KEY("postId") REFERENCES "Post"("id"),
    FOREIGN KEY("userId") REFERENCES "User"("id")
);