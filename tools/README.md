# Local downloaded tools

This folder keeps the downloaded local runtime tools used by the project.

## Neo4j

Downloaded zip:

```text
tools/neo4j/neo4j-community-2026.03.1-windows.zip
```

Extracted folder:

```text
tools/neo4j/neo4j-community-2026.03.1/
```

Purpose:

```text
Stores and queries the mathematics knowledge graph as a graph database.
```

## Java

Downloaded zip:

```text
tools/java/temurin-jdk-21-windows-x64.zip
```

Extracted folder:

```text
tools/java/jdk-21.0.10+7/
```

Purpose:

```text
Provides the Java runtime required by Neo4j.
```

## Runtime Copy

Neo4j's Windows scripts had trouble running from the project path because the path contains the Chinese folder name `王`. For that reason, a runtime copy is also kept in a plain English path:

```text
C:\VideoRecommendationSystemRuntime\
```

The downloaded packages still remain in this project folder under `tools/`.

## Git

Large downloaded binaries and extracted tool folders are intentionally ignored by Git:

```text
tools/neo4j/*.zip
tools/neo4j/*/
tools/java/*.zip
tools/java/*/
```

Only README files are committed so the project records what was downloaded and where it is stored.
