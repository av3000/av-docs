# gRPC

## What is gRPC?

High-performance RPC framework that uses Protocol Buffers for serialization. Enables efficient communication between services with automatic code generation for multiple languages.

## Key Benefits

- **🌐 Cross-Language**: One API definition works across 20+ programming languages
- **⚡ High Performance**: 7-10x faster than REST with binary serialization and HTTP/2
- **🔄 Streaming Support**: Real-time bidirectional communication built into the protocol
- **📋 Contract-First**: Proto files serve as executable documentation and prevent breaking changes
- **🛡️ Production Ready**: Authentication, load balancing, health checks, and observability included
- **🔧 Rich Ecosystem**: Extensive tooling, service mesh integration, and cloud provider support

## Why gRPC?

### Cross-Language Communication

**What**: Write your API once, use it from any language - Go, Python, Java, C#, JavaScript, and 20+ others
**Why**: Microservices in different languages can communicate seamlessly. No more REST adapter layers between services.

```protobuf
// Define once in .proto file
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
}

// Use from any language:
// Go: client.GetUser(ctx, &pb.GetUserRequest{Id: "123"})
// Python: client.GetUser(GetUserRequest(id="123"))
// Node.js: client.getUser({id: "123"}, callback)
```

### High Performance by Design

**What**: Binary serialization, HTTP/2 multiplexing, and efficient streaming
**Why**: 7-10x faster than JSON REST APIs. Handle thousands of concurrent connections with lower latency.

```javascript
// REST: Multiple round trips, JSON parsing overhead
const user = await fetch("/api/users/123").then((r) => r.json());
const posts = await fetch("/api/posts?userId=123").then((r) => r.json());
const comments = await fetch("/api/comments?userId=123").then((r) => r.json());

// gRPC: Single connection, binary data, parallel requests
const [user, posts, comments] = await Promise.all([
  client.getUser({ id: "123" }),
  client.getUserPosts({ userId: "123" }),
  client.getUserComments({ userId: "123" }),
]);
```

### Built-in Streaming

**What**: Four types of communication: unary, server streaming, client streaming, bidirectional streaming
**Why**: Real-time features without WebSockets. Live data feeds, file uploads, chat systems all use the same protocol.

```protobuf
service ChatService {
  rpc SendMessage(Message) returns (Empty);           // Unary
  rpc GetMessages(Empty) returns (stream Message);    // Server streaming
  rpc UploadFile(stream FileChunk) returns (FileInfo); // Client streaming
  rpc Chat(stream Message) returns (stream Message);   // Bidirectional
}
```

### Contract-First Development

**What**: API contract defined in .proto files, code generated automatically
**Why**: Frontend and backend teams can work in parallel. Contract prevents breaking changes and serves as living documentation.

### Production-Grade Features

**What**: Built-in authentication, load balancing, retries, circuit breakers, and observability
**Why**: Features you'd build yourself with REST come out of the box. Battle-tested by Google, Netflix, and other major companies.

## Core Principles

### Protocol Buffers (Protobuf)

- **Schema definition** in `.proto` files
- **Binary serialization** for efficiency
- **Code generation** for multiple languages
- **Forward/backward compatibility** with versioning

### HTTP/2 Foundation

- **Multiplexing** multiple requests over single connection
- **Header compression** reduces overhead
- **Flow control** prevents overwhelming clients
- **Server push** for proactive data delivery

### Service-Oriented Architecture

- **Services** define related RPC methods
- **Messages** define request/response structures
- **Strongly typed** contracts prevent runtime errors
- **Language agnostic** implementation

## Architecture

### Proto Definition

**Purpose**: Single source of truth for your API contract
**Benefit**: Documentation, validation, and code generation from one file

```protobuf
syntax = "proto3";

package user.v1;

// Service definition - what operations are available
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
  rpc CreateUser(CreateUserRequest) returns (CreateUserResponse);
  rpc GetUserStream(GetUserStreamRequest) returns (stream User);
}

// Message definitions - data structures
message GetUserRequest {
  string user_id = 1;
}

message GetUserResponse {
  User user = 1;
  string error_message = 2;
}

message User {
  string id = 1;
  string name = 2;
  string email = 3;
  int64 created_at = 4;
}
```

_Proto file defines the contract. Generate client/server code for any supported language._

### Code Generation

**Purpose**: Transform proto files into language-specific client and server stubs
**Benefit**: Type-safe clients and server interfaces with zero manual typing

```bash
# Generate JavaScript client and TypeScript definitions
protoc --js_out=import_style=commonjs:./src/generated \
       --grpc-web_out=import_style=typescript,mode=grpcwebtext:./src/generated \
       user.proto

# Generate Go server stubs
protoc --go_out=. --go-grpc_out=. user.proto

# Generate Python client
python -m grpc_tools.protoc --python_out=. --pyi_out=. --grpc_python_out=. user.proto
```

_One proto file generates clients for all your languages. No manual API client maintenance._

### Service Implementation

**Purpose**: Implement the business logic for your gRPC methods
**Benefit**: Focus on business logic, framework handles networking, serialization, and error handling

```javascript
// Node.js server implementation
class UserService {
  async getUser(call, callback) {
    try {
      const { user_id } = call.request;
      const user = await database.findUser(user_id);

      if (!user) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "User not found",
        });
      }

      callback(null, {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          created_at: user.createdAt.getTime(),
        },
      });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: "Internal server error",
      });
    }
  }
}
```

_Implement methods defined in proto. gRPC handles serialization, networking, and error propagation._

## Server Setup

### Node.js Server

**Purpose**: Serve gRPC methods over HTTP/2
**Benefit**: High-performance server with built-in features like health checking and reflection

```javascript
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load proto definition
const packageDefinition = protoLoader.loadSync("user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user.v1;

// Create server
const server = new grpc.Server();

// Add service implementation
server.addService(userProto.UserService.service, new UserService());

// Start server
server.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) throw err;
    console.log(`gRPC server running on port ${port}`);
    server.start();
  }
);
```

_Minimal setup for a production-ready gRPC server. Built-in connection management and error handling._

### Go Server

**Purpose**: High-performance server implementation
**Benefit**: Excellent concurrency and performance characteristics

```go
package main

import (
    "context"
    "log"
    "net"

    "google.golang.org/grpc"
    pb "your-module/generated"
)

type UserServer struct {
    pb.UnimplementedUserServiceServer
}

func (s *UserServer) GetUser(ctx context.Context, req *pb.GetUserRequest) (*pb.GetUserResponse, error) {
    // Business logic here
    user := &pb.User{
        Id:    req.UserId,
        Name:  "John Doe",
        Email: "john@example.com",
    }

    return &pb.GetUserResponse{User: user}, nil
}

func main() {
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("Failed to listen: %v", err)
    }

    s := grpc.NewServer()
    pb.RegisterUserServiceServer(s, &UserServer{})

    log.Println("gRPC server listening on :50051")
    if err := s.Serve(lis); err != nil {
        log.Fatalf("Failed to serve: %v", err)
    }
}
```

_Go's excellent gRPC support makes it popular for high-performance microservices._

## Client Setup

### Node.js Client

**Purpose**: Call gRPC services from JavaScript/TypeScript applications
**Benefit**: Type-safe client with automatic connection management and retries

```javascript
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

// Load proto definition
const packageDefinition = protoLoader.loadSync("user.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const userProto = grpc.loadPackageDefinition(packageDefinition).user.v1;

// Create client
const client = new userProto.UserService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Call methods
client.getUser({ user_id: "123" }, (error, response) => {
  if (error) {
    console.error("Error:", error.message);
    return;
  }
  console.log("User:", response.user);
});
```

_Generated client handles connection pooling, retries, and load balancing automatically._

### Browser Client (gRPC-Web)

**Purpose**: Use gRPC from web browsers
**Benefit**: Same API contract for web and mobile clients, better than REST for real-time features

```javascript
const { UserServiceClient } = require("./generated/user_grpc_web_pb");
const { GetUserRequest } = require("./generated/user_pb");

// Create client
const client = new UserServiceClient("http://localhost:8080");

// Call methods
const request = new GetUserRequest();
request.setUserId("123");

client.getUser(request, {}, (err, response) => {
  if (err) {
    console.error("Error:", err.message);
    return;
  }

  const user = response.getUser();
  console.log("User:", {
    id: user.getId(),
    name: user.getName(),
    email: user.getEmail(),
  });
});
```

_gRPC-Web enables browser clients. Requires proxy (Envoy) to translate between HTTP/2 gRPC and HTTP/1.1._

### React Integration

**Purpose**: Use gRPC in React applications with proper state management
**Benefit**: Real-time data with better performance than WebSockets or Server-Sent Events

```javascript
import { useEffect, useState } from "react";

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const request = new GetUserRequest();
    request.setUserId(userId);

    client.getUser(request, {}, (err, response) => {
      setLoading(false);
      if (err) {
        setError(err.message);
        return;
      }
      setUser(response.getUser());
    });
  }, [userId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>{user.getName()}</h1>
      <p>{user.getEmail()}</p>
    </div>
  );
}
```

_Standard React patterns work with gRPC. Consider wrapping in custom hooks for reusability._

## Communication Patterns

### Unary RPC

**Purpose**: Simple request-response, like REST API calls
**When**: Standard CRUD operations, authentication, simple queries

```protobuf
service UserService {
  rpc GetUser(GetUserRequest) returns (GetUserResponse);
}
```

```javascript
// Client call
client.getUser({ user_id: "123" }, (error, response) => {
  if (error) {
    console.error("Failed to get user:", error.message);
    return;
  }
  console.log("User:", response.user);
});
```

_Most common pattern. Works exactly like a function call with network in between._

### Server Streaming

**Purpose**: Server sends multiple responses for one client request
**When**: Live feeds, real-time updates, large datasets, progressive loading

```protobuf
service NewsService {
  rpc GetLiveNews(NewsRequest) returns (stream NewsItem);
}
```

```javascript
// Client receives stream of news items
const call = client.getLiveNews({ category: "tech" });

call.on("data", (newsItem) => {
  console.log("New article:", newsItem.title);
  // Update UI in real-time
});

call.on("end", () => {
  console.log("Stream ended");
});

call.on("error", (error) => {
  console.error("Stream error:", error.message);
});
```

_Server pushes data as it becomes available. Client processes updates in real-time._

### Client Streaming

**Purpose**: Client sends multiple requests, server responds once
**When**: File uploads, batch operations, aggregating data over time

```protobuf
service FileService {
  rpc UploadFile(stream FileChunk) returns (UploadResponse);
}
```

```javascript
// Client uploads file in chunks
const call = client.uploadFile((error, response) => {
  if (error) {
    console.error("Upload failed:", error.message);
    return;
  }
  console.log("Upload complete:", response.file_url);
});

// Send file in chunks
fs.createReadStream("large-file.pdf")
  .on("data", (chunk) => {
    call.write({
      data: chunk,
      filename: "large-file.pdf",
    });
  })
  .on("end", () => {
    call.end();
  });
```

_Efficient for large files or when you need to aggregate multiple inputs server-side._

### Bidirectional Streaming

**Purpose**: Both client and server send streams of messages
**When**: Chat applications, collaborative editing, real-time gaming, live monitoring

```protobuf
service ChatService {
  rpc Chat(stream ChatMessage) returns (stream ChatMessage);
}
```

```javascript
// Real-time chat
const call = client.chat();

// Listen for messages from other users
call.on("data", (message) => {
  console.log(`${message.user}: ${message.text}`);
  // Update chat UI
});

// Send messages
document.getElementById("send-button").onclick = () => {
  const text = document.getElementById("message-input").value;
  call.write({
    user: currentUser,
    text: text,
    timestamp: Date.now(),
  });
};
```

_Full duplex communication. Both sides can send/receive independently._

## Error Handling

### Status Codes

**Purpose**: Standardized error codes across all gRPC implementations
**Benefit**: Consistent error handling regardless of server language

```javascript
const grpc = require("@grpc/grpc-js");

// Server-side error handling
class UserService {
  async getUser(call, callback) {
    const { user_id } = call.request;

    if (!user_id) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: "User ID is required",
      });
    }

    const user = await database.findUser(user_id);
    if (!user) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "User not found",
      });
    }

    // Check permissions
    if (!canAccessUser(call.metadata, user)) {
      return callback({
        code: grpc.status.PERMISSION_DENIED,
        message: "Access denied",
      });
    }

    callback(null, { user });
  }
}

// Client-side error handling
client.getUser({ user_id: "123" }, (error, response) => {
  if (error) {
    switch (error.code) {
      case grpc.status.NOT_FOUND:
        showUserNotFoundError();
        break;
      case grpc.status.PERMISSION_DENIED:
        redirectToLogin();
        break;
      case grpc.status.INVALID_ARGUMENT:
        showValidationError(error.message);
        break;
      default:
        showGenericError();
    }
    return;
  }

  displayUser(response.user);
});
```

_Standard status codes enable consistent error handling across different services and languages._

### Error Details

**Purpose**: Include structured error information beyond just status codes
**Benefit**: Rich error context for better debugging and user experience

```protobuf
// Error details in proto
message ErrorDetail {
  string field = 1;
  string message = 2;
}

message ValidationError {
  repeated ErrorDetail errors = 1;
}
```

```javascript
// Server sends detailed errors
const { ValidationError, ErrorDetail } = require("./generated/error_pb");

class UserService {
  async createUser(call, callback) {
    const errors = validateUser(call.request);

    if (errors.length > 0) {
      const validationError = new ValidationError();
      errors.forEach((err) => {
        const detail = new ErrorDetail();
        detail.setField(err.field);
        detail.setMessage(err.message);
        validationError.addErrors(detail);
      });

      const error = new Error("Validation failed");
      error.code = grpc.status.INVALID_ARGUMENT;
      error.details = [validationError];

      return callback(error);
    }

    // Proceed with creation
  }
}
```

_Rich error details help clients provide specific feedback to users._

## Advanced Features

### Authentication & Security

**Purpose**: Secure your gRPC services with authentication and authorization
**Benefit**: Production-ready security with minimal configuration

```javascript
// Server with TLS and authentication
const fs = require("fs");

const server = new grpc.Server();

// Add authentication middleware
const authInterceptor = (ctx, next) => {
  const token = ctx.call.metadata.get("authorization")[0];

  if (!isValidToken(token)) {
    const error = new Error("Unauthorized");
    error.code = grpc.status.UNAUTHENTICATED;
    throw error;
  }

  ctx.user = getUserFromToken(token);
  return next();
};

server.addService(userProto.UserService.service, new UserService(), {
  interceptors: [authInterceptor],
});

// Use TLS credentials
const credentials = grpc.ServerCredentials.createSsl(
  fs.readFileSync("ca-cert.pem"),
  [
    {
      cert_chain: fs.readFileSync("server-cert.pem"),
      private_key: fs.readFileSync("server-key.pem"),
    },
  ]
);

server.bindAsync("localhost:50051", credentials, callback);
```

_Built-in support for TLS, authentication tokens, and custom authorization logic._

### Load Balancing

**Purpose**: Distribute requests across multiple server instances
**Benefit**: High availability and horizontal scaling

```javascript
// Client with load balancing
const client = new userProto.UserService(
  "dns:///user-service:50051", // Service discovery via DNS
  grpc.credentials.createInsecure(),
  {
    "grpc.lb_policy_name": "round_robin",
    "grpc.service_config": JSON.stringify({
      loadBalancingConfig: [{ round_robin: {} }],
      methodConfig: [
        {
          name: [{ service: "user.v1.UserService" }],
          retryPolicy: {
            maxAttempts: 3,
            initialBackoff: "0.1s",
            maxBackoff: "1s",
            backoffMultiplier: 2,
            retryableStatusCodes: ["UNAVAILABLE", "DEADLINE_EXCEEDED"],
          },
        },
      ],
    }),
  }
);
```

_Client automatically distributes load and retries failed requests._

### Interceptors/Middleware

**Purpose**: Cross-cutting concerns like logging, metrics, authentication
**Benefit**: Reusable logic that applies to all or specific methods

```javascript
// Logging interceptor
const loggingInterceptor = (ctx, next) => {
  const start = Date.now();
  const method = ctx.call.getPath();

  console.log(`[${new Date().toISOString()}] ${method} started`);

  return next()
    .then((result) => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${method} completed in ${duration}ms`
      );
      return result;
    })
    .catch((error) => {
      const duration = Date.now() - start;
      console.log(
        `[${new Date().toISOString()}] ${method} failed in ${duration}ms: ${
          error.message
        }`
      );
      throw error;
    });
};

// Apply to all methods
server.addService(userProto.UserService.service, new UserService(), {
  interceptors: [loggingInterceptor, authInterceptor, metricsInterceptor],
});
```

_Interceptors compose cleanly for complex cross-cutting requirements._

### Health Checking

**Purpose**: Monitor service health for load balancers and orchestrators
**Benefit**: Automatic failover and traffic routing based on service health

```javascript
const health = require("grpc-health-check");

// Add health checking service
const healthImpl = new health.Implementation({
  "user.v1.UserService": health.servingStatus.SERVING,
  "": health.servingStatus.SERVING, // Overall service health
});

server.addService(health.service, healthImpl);

// Update health status based on dependencies
setInterval(() => {
  const isDbHealthy = checkDatabaseConnection();
  const status = isDbHealthy
    ? health.servingStatus.SERVING
    : health.servingStatus.NOT_SERVING;

  healthImpl.setStatus("user.v1.UserService", status);
}, 10000);
```

_Standard health checking protocol understood by Kubernetes, load balancers, etc._

## Migration & Integration

### From REST APIs

**Strategy**: Gradual migration with dual-stack support
**Benefit**: Migrate critical paths first, maintain compatibility

```javascript
// Serve both REST and gRPC
const express = require("express");
const app = express();

// Existing REST endpoints
app.get("/api/users/:id", async (req, res) => {
  // Legacy REST handler
});

// gRPC server on different port
const grpcServer = new grpc.Server();
grpcServer.addService(userProto.UserService.service, new UserService());
grpcServer.bindAsync(
  "localhost:50051",
  grpc.ServerCredentials.createInsecure(),
  callback
);

// Or use grpc-gateway to serve gRPC via REST
```

### With Microservices

**Strategy**: Service mesh integration with Envoy, Istio, or Linkerd
**Benefit**: Observability, security, and traffic management

```yaml
# Kubernetes deployment with Istio
apiVersion: apps/v1
kind: Deployment
metadata:
  name: user-service
spec:
  template:
    metadata:
      annotations:
        sidecar.istio.io/inject: "true" # Automatic proxy injection
    spec:
      containers:
        - name: user-service
          image: user-service:latest
          ports:
            - containerPort: 50051
```

### Database Integration

**Strategy**: Use connection pooling and prepared statements
**Benefit**: Efficient database usage with high-concurrency gRPC services

```javascript
const { Pool } = require("pg");

class UserService {
  constructor() {
    this.db = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // Connection pool size
    });
  }

  async getUser(call, callback) {
    try {
      const { rows } = await this.db.query(
        "SELECT id, name, email FROM users WHERE id = $1",
        [call.request.user_id]
      );

      if (rows.length === 0) {
        return callback({
          code: grpc.status.NOT_FOUND,
          message: "User not found",
        });
      }

      callback(null, { user: rows[0] });
    } catch (error) {
      callback({
        code: grpc.status.INTERNAL,
        message: "Database error",
      });
    }
  }
}
```

## Best Practices & References

### Example Repositories

**Production Examples:**

- [**grpc-go examples**](https://github.com/grpc/grpc-go/tree/master/examples) - Official Go examples
- [**awesome-grpc**](https://github.com/grpc-ecosystem/awesome-grpc) - Curated list of gRPC resources
- [**grpc-web examples**](https://github.com/grpc/grpc-web/tree/master/examples) - Browser client examples
- [**buf examples**](https://github.com/bufbuild/buf-examples) - Modern protobuf workflow examples

**Learning Examples:**

- [**grpc microservices**](https://github.com/harlow/go-micro-services) - Microservices architecture
- [**grpc-node examples**](https://github.com/grpc/grpc-node/tree/master/examples) - Node.js implementations
- [**grpc streaming**](https://github.com/grpc/grpc-go/tree/master/examples/features/streaming) - All streaming patterns

### Project Structure

```
proto/
├── user/
│   └── v1/
│       └── user.proto       # User service definition
├── auth/
│   └── v1/
│       └── auth.proto       # Auth service definition
└── common/
    └── v1/
        └── common.proto     # Shared messages

src/
├── generated/               # Generated code (gitignored)
├── services/               # Service implementations
│   ├── user.js
│   └── auth.js
├── interceptors/           # Middleware
│   ├── auth.js
│   ├── logging.js
│   └── metrics.js
└── server.js              # Server setup

buf.yaml                   # Buf configuration
buf.gen.yaml              # Code generation config
```

### Development Workflow

1. **Define proto contracts** with stakeholders
2. **Generate code** for all languages using buf or protoc
3. **Implement services** focusing on business logic
4. **Add interceptors** for cross-cutting concerns
5. **Test with tools** like grpcurl or Postman
6. **Deploy with service mesh** for production features

### Performance Tips

- **Use connection pooling** - reuse connections across requests
- **Enable compression** - gzip compression for large payloads
- **Batch operations** - group related calls when possible
- **Stream large data** - use streaming for files or datasets
- **Monitor metrics** - track latency, error rates, and throughput

### Tooling

- [**buf**](https://buf.build/) - Modern protobuf workflow and linting
- [**grpcurl**](https://github.com/fullstorydev/grpcurl) - cURL for gRPC services
- [**Postman**](https://www.postman.com/) - GUI client for testing
- [**Evans**](https://github.com/ktr0731/evans) - Interactive gRPC client
- [**grpc-web-devtools**](https://github.com/SafetyCulture/grpc-web-devtools) - Browser debugging
