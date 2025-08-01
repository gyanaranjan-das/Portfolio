export interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: Date;
  likes: number;
  replies?: Comment[];
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishedAt: Date;
  updatedAt?: Date;
  tags: string[];
  category: string;
  readTime: number;
  likes: number;
  views: number;
  comments: Comment[];
  featured: boolean;
  coverImage?: string;
}

// Mock blog data
export const mockBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "The Future of Quantum Computing in AI: A Deep Dive",
    slug: "quantum-computing-ai-future",
    excerpt:
      "Exploring how quantum algorithms are revolutionizing machine learning and what this means for the next decade of AI development.",
    content: `# The Future of Quantum Computing in AI: A Deep Dive

The intersection of quantum computing and artificial intelligence represents one of the most exciting frontiers in modern technology. As we stand on the brink of the quantum advantage era, it's crucial to understand how these two revolutionary fields will reshape our technological landscape.

## Quantum Supremacy in Machine Learning

Quantum computers excel at solving certain types of problems that are computationally intensive for classical computers. In machine learning, this translates to:

### 1. Exponential Speedup in Training
- **Quantum Neural Networks (QNNs)**: Leveraging quantum superposition and entanglement for faster training
- **Variational Quantum Eigensolvers (VQE)**: Optimizing complex cost functions in quantum space
- **Quantum Approximate Optimization Algorithm (QAOA)**: Solving combinatorial optimization problems

### 2. Enhanced Feature Mapping
Quantum computers can map classical data into high-dimensional Hilbert spaces, potentially revealing patterns invisible to classical algorithms.

\`\`\`python
# Example: Quantum Feature Map
from qiskit import QuantumCircuit
from qiskit.circuit.library import ZZFeatureMap

def quantum_feature_map(data, num_qubits):
    feature_map = ZZFeatureMap(feature_dimension=len(data), 
                              reps=2, entanglement='linear')
    return feature_map.bind_parameters(data)
\`\`\`

## Current Challenges and Solutions

### Quantum Decoherence
The biggest challenge facing quantum computing today is maintaining quantum states long enough for meaningful computation.

**Current Solutions:**
- Error correction codes
- Topological qubits
- Hybrid classical-quantum algorithms

### Limited Quantum Volume
Current quantum computers have limited qubit counts and gate fidelities.

**Emerging Solutions:**
- IBM's roadmap to 1000+ qubit systems
- Google's error-corrected logical qubits
- Trapped ion systems with high fidelity

## Real-World Applications

### 1. Drug Discovery
Quantum algorithms can simulate molecular interactions at unprecedented scales, accelerating pharmaceutical research.

### 2. Financial Modeling
Portfolio optimization and risk analysis benefit from quantum computing's ability to handle complex multi-variable problems.

### 3. Supply Chain Optimization
Quantum algorithms excel at solving large-scale logistics and optimization problems.

## The Road Ahead

The next 5-10 years will be crucial for quantum computing in AI:

1. **2024-2026**: Increased quantum advantage demonstrations
2. **2026-2028**: First commercial quantum ML applications
3. **2028-2030**: Widespread adoption in specific industries

## Conclusion

While we're still in the early stages of quantum computing, the potential for revolutionary breakthroughs in AI is immense. The key is developing hybrid approaches that leverage the strengths of both classical and quantum systems.

The future belongs to those who can bridge these two worlds effectively.`,
    author: "Gyanaranjan Das",
    authorAvatar: "👨‍💻",
    publishedAt: new Date("2024-01-15"),
    tags: ["Quantum Computing", "AI", "Machine Learning", "Future Tech"],
    category: "Technology",
    readTime: 8,
    likes: 42,
    views: 1250,
    comments: [
      {
        id: "c1",
        author: "Alex Chen",
        avatar: "👩‍🔬",
        content:
          "Fascinating read! I'm particularly interested in the VQE applications. Have you experimented with any hybrid algorithms?",
        timestamp: new Date("2024-01-16"),
        likes: 5,
        replies: [
          {
            id: "c1-r1",
            author: "Gyanaranjan Das",
            avatar: "👨‍💻",
            content:
              "Yes! I've been working on a hybrid quantum-classical approach for portfolio optimization. The preliminary results are promising!",
            timestamp: new Date("2024-01-16"),
            likes: 3,
          },
        ],
      },
      {
        id: "c2",
        author: "Dr. Sarah Kim",
        avatar: "🔬",
        content:
          "Great overview! The quantum feature mapping section really clarified some concepts for me. Looking forward to more content like this.",
        timestamp: new Date("2024-01-17"),
        likes: 8,
      },
    ],
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop",
  },
  {
    id: "2",
    title: "Building Scalable Microservices with Kubernetes and Service Mesh",
    slug: "scalable-microservices-kubernetes",
    excerpt:
      "A comprehensive guide to designing and implementing microservices architecture that can handle enterprise-scale traffic and complexity.",
    content: `# Building Scalable Microservices with Kubernetes and Service Mesh

In today's cloud-native world, microservices architecture has become the de facto standard for building scalable, maintainable applications. This post explores best practices for implementing microservices using Kubernetes and service mesh technologies.

## Architecture Overview

### Core Principles
1. **Single Responsibility**: Each service should have one reason to change
2. **Autonomy**: Services should be independently deployable
3. **Decentralization**: Avoid shared databases and centralized components
4. **Fault Isolation**: Failures should not cascade across services

## Kubernetes Foundation

### Service Discovery and Load Balancing
\`\`\`yaml
apiVersion: v1
kind: Service
metadata:
  name: user-service
spec:
  selector:
    app: user-service
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
\`\`\`

### Configuration Management
Using ConfigMaps and Secrets for environment-specific configurations:

\`\`\`yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: app-config
data:
  database_url: "postgresql://db:5432/app"
  redis_url: "redis://cache:6379"
\`\`\`

## Service Mesh with Istio

### Traffic Management
Implementing canary deployments and circuit breakers:

\`\`\`yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: user-service
spec:
  http:
  - match:
    - headers:
        canary:
          exact: "true"
    route:
    - destination:
        host: user-service
        subset: v2
      weight: 100
  - route:
    - destination:
        host: user-service
        subset: v1
      weight: 90
    - destination:
        host: user-service
        subset: v2
      weight: 10
\`\`\`

### Security Policies
Implementing zero-trust networking:

\`\`\`yaml
apiVersion: security.istio.io/v1beta1
kind: AuthorizationPolicy
metadata:
  name: user-service-policy
spec:
  selector:
    matchLabels:
      app: user-service
  rules:
  - from:
    - source:
        principals: ["cluster.local/ns/default/sa/api-gateway"]
    to:
    - operation:
        methods: ["GET", "POST"]
\`\`\`

## Monitoring and Observability

### The Three Pillars
1. **Metrics**: Prometheus + Grafana
2. **Logs**: ELK Stack or Loki
3. **Traces**: Jaeger or Zipkin

### Key Metrics to Monitor
- Request rate and latency
- Error rates and types
- Resource utilization
- Business metrics

## Data Management Strategies

### Database per Service
Each microservice should own its data:

\`\`\`python
# User Service - PostgreSQL
class UserRepository:
    def __init__(self, db_connection):
        self.db = db_connection
    
    def get_user(self, user_id):
        return self.db.execute(
            "SELECT * FROM users WHERE id = %s", 
            [user_id]
        ).fetchone()

# Order Service - MongoDB
class OrderRepository:
    def __init__(self, mongo_client):
        self.db = mongo_client.orders
    
    def create_order(self, order_data):
        return self.db.orders.insert_one(order_data)
\`\`\`

### Event-Driven Communication
Using Apache Kafka for asynchronous communication:

\`\`\`python
from kafka import KafkaProducer
import json

class EventPublisher:
    def __init__(self):
        self.producer = KafkaProducer(
            bootstrap_servers=['kafka:9092'],
            value_serializer=lambda x: json.dumps(x).encode('utf-8')
        )
    
    def publish_user_created(self, user_data):
        self.producer.send('user.created', user_data)
\`\`\`

## Deployment Strategies

### Blue-Green Deployments
Zero-downtime deployments with instant rollback capability.

### Canary Releases
Gradual rollout to minimize risk and gather real-world feedback.

### Feature Flags
Decouple deployment from release using feature toggles.

## Common Pitfalls and Solutions

### 1. Distributed Monolith
**Problem**: Services are too tightly coupled
**Solution**: Implement proper service boundaries and async communication

### 2. Data Consistency
**Problem**: Maintaining consistency across services
**Solution**: Embrace eventual consistency and implement saga patterns

### 3. Network Complexity
**Problem**: Service-to-service communication overhead
**Solution**: Use service mesh for traffic management and security

## Best Practices

1. **Start with a Monolith**: Extract services as you understand boundaries
2. **Automate Everything**: CI/CD, testing, deployment, monitoring
3. **Design for Failure**: Implement circuit breakers and bulkheads
4. **Security First**: Zero-trust networking and least privilege access
5. **Monitor Continuously**: Comprehensive observability from day one

## Conclusion

Building scalable microservices requires careful planning, the right tools, and a commitment to operational excellence. Kubernetes provides the foundation, while service mesh adds the necessary abstractions for complex service-to-service communication.

The key is to start simple, automate early, and evolve your architecture based on real-world usage patterns and requirements.`,
    author: "Gyanaranjan Das",
    authorAvatar: "👨‍💻",
    publishedAt: new Date("2024-01-10"),
    tags: ["Microservices", "Kubernetes", "DevOps", "Architecture"],
    category: "DevOps",
    readTime: 12,
    likes: 67,
    views: 2100,
    comments: [
      {
        id: "c3",
        author: "Mike Rodriguez",
        avatar: "⚙️",
        content:
          "Excellent guide! The service mesh section was particularly helpful. Do you have any thoughts on when to choose Istio vs Linkerd?",
        timestamp: new Date("2024-01-11"),
        likes: 12,
      },
      {
        id: "c4",
        author: "Jennifer Walsh",
        avatar: "☁️",
        content:
          "This is exactly what I needed for our migration project. The YAML examples are super practical!",
        timestamp: new Date("2024-01-12"),
        likes: 7,
      },
    ],
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop",
  },
  {
    id: "3",
    title: "Deep Learning Model Optimization: From Research to Production",
    slug: "dl-model-optimization-production",
    excerpt:
      "Practical strategies for optimizing deep learning models for production deployment, including quantization, pruning, and edge computing considerations.",
    content: `# Deep Learning Model Optimization: From Research to Production

Transitioning deep learning models from research environments to production systems requires careful consideration of performance, efficiency, and deployment constraints. This guide covers essential optimization techniques for real-world ML deployments.

## The Production Reality Check

Research models often prioritize accuracy over efficiency, but production systems must balance:
- **Latency**: Response time requirements
- **Throughput**: Requests per second capacity  
- **Resource Constraints**: Memory, CPU, storage limitations
- **Power Efficiency**: Especially critical for edge devices
- **Cost**: Infrastructure and operational expenses

## Model Optimization Techniques

### 1. Quantization

Converting from 32-bit floats to lower precision:

\`\`\`python
import torch
import torch.quantization as quant

# Post-training quantization
model = torch.load('model.pth')
model.eval()

# Dynamic quantization
quantized_model = torch.quantization.quantize_dynamic(
    model, {torch.nn.Linear}, dtype=torch.qint8
)

# Static quantization (requires calibration data)
model.qconfig = torch.quantization.get_default_qconfig('fbgemm')
torch.quantization.prepare(model, inplace=True)

# Calibrate with representative data
for data, _ in calibration_loader:
    model(data)

torch.quantization.convert(model, inplace=True)
\`\`\`

### 2. Pruning

Removing unnecessary model parameters:

\`\`\`python
import torch.nn.utils.prune as prune

# Magnitude-based pruning
parameters_to_prune = (
    (model.conv1, 'weight'),
    (model.conv2, 'weight'),
    (model.fc1, 'weight'),
    (model.fc2, 'weight'),
)

prune.global_unstructured(
    parameters_to_prune,
    pruning_method=prune.L1Unstructured,
    amount=0.2,  # Remove 20% of parameters
)

# Remove pruning reparameterization
for module, param in parameters_to_prune:
    prune.remove(module, param)
\`\`\`

### 3. Knowledge Distillation

Training smaller student models:

\`\`\`python
import torch.nn.functional as F

def distillation_loss(student_logits, teacher_logits, labels, temperature=3.0, alpha=0.7):
    # Soft targets from teacher
    soft_targets = F.softmax(teacher_logits / temperature, dim=1)
    soft_predictions = F.log_softmax(student_logits / temperature, dim=1)
    
    # Distillation loss
    distill_loss = F.kl_div(soft_predictions, soft_targets, reduction='batchmean')
    
    # Standard cross-entropy loss
    student_loss = F.cross_entropy(student_logits, labels)
    
    # Combined loss
    return alpha * distill_loss * (temperature ** 2) + (1 - alpha) * student_loss
\`\`\`

## Framework-Specific Optimizations

### TensorFlow Lite for Mobile/Edge

\`\`\`python
import tensorflow as tf

# Convert to TensorFlow Lite
converter = tf.lite.TFLiteConverter.from_saved_model('saved_model_dir')

# Apply optimizations
converter.optimizations = [tf.lite.Optimize.DEFAULT]
converter.target_spec.supported_types = [tf.float16]

# Quantization
converter.representative_dataset = representative_data_gen
converter.target_spec.supported_ops = [tf.lite.OpsSet.TFLITE_BUILTINS_INT8]
converter.inference_input_type = tf.int8
converter.inference_output_type = tf.int8

tflite_model = converter.convert()
\`\`\`

### ONNX for Cross-Platform Deployment

\`\`\`python
import torch
import onnx
import onnxruntime as ort

# Export PyTorch model to ONNX
dummy_input = torch.randn(1, 3, 224, 224)
torch.onnx.export(model, dummy_input, "model.onnx", 
                  export_params=True, opset_version=11)

# Optimize ONNX model
import onnxoptimizer
optimized_model = onnxoptimizer.optimize(onnx.load("model.onnx"))

# Create inference session
session = ort.InferenceSession("optimized_model.onnx")
\`\`\`

## Hardware-Specific Optimizations

### GPU Optimization with TensorRT

\`\`\`python
import tensorrt as trt
import pycuda.driver as cuda

def build_engine(onnx_path, engine_path, max_batch_size=1):
    TRT_LOGGER = trt.Logger(trt.Logger.WARNING)
    
    with trt.Builder(TRT_LOGGER) as builder, \
         builder.create_network() as network, \
         trt.OnnxParser(network, TRT_LOGGER) as parser:
        
        builder.max_batch_size = max_batch_size
        builder.max_workspace_size = 1 << 30  # 1GB
        
        # Enable mixed precision
        if builder.platform_has_fast_fp16:
            builder.fp16_mode = True
            
        with open(onnx_path, 'rb') as model:
            parser.parse(model.read())
            
        engine = builder.build_cuda_engine(network)
        
        with open(engine_path, "wb") as f:
            f.write(engine.serialize())
            
        return engine
\`\`\`

### Edge Computing with ARM optimization

\`\`\`python
# Raspberry Pi optimization example
import tflite_runtime.interpreter as tflite

# Use NEON-optimized delegate
interpreter = tflite.Interpreter(
    model_path="model.tflite",
    experimental_delegates=[
        tflite.load_delegate('libedgetpu.so.1')  # For Coral TPU
    ]
)

interpreter.allocate_tensors()
\`\`\`

## Deployment Strategies

### Model Serving with TensorFlow Serving

\`\`\`bash
# Docker deployment
docker run -p 8501:8501 \
  --mount type=bind,source=/path/to/model,target=/models/my_model \
  -e MODEL_NAME=my_model \
  tensorflow/serving
\`\`\`

### Serverless Deployment

\`\`\`python
# AWS Lambda with lightweight models
import json
import torch
import base64
from io import BytesIO
from PIL import Image

def lambda_handler(event, context):
    # Load quantized model
    model = torch.jit.load('quantized_model.pt')
    model.eval()
    
    # Process input
    image_data = base64.b64decode(event['image'])
    image = Image.open(BytesIO(image_data))
    
    # Inference
    with torch.no_grad():
        prediction = model(preprocess(image))
    
    return {
        'statusCode': 200,
        'body': json.dumps({
            'prediction': prediction.tolist()
        })
    }
\`\`\`

## Monitoring and Performance Metrics

### Key Metrics to Track

\`\`\`python
import time
import psutil
import torch

class ModelProfiler:
    def __init__(self):
        self.metrics = {}
    
    def profile_inference(self, model, input_data):
        # Memory usage
        process = psutil.Process()
        memory_before = process.memory_info().rss / 1024 / 1024  # MB
        
        # GPU memory (if available)
        if torch.cuda.is_available():
            gpu_memory_before = torch.cuda.memory_allocated() / 1024 / 1024
        
        # Timing
        start_time = time.time()
        
        with torch.no_grad():
            output = model(input_data)
        
        end_time = time.time()
        
        # Calculate metrics
        inference_time = (end_time - start_time) * 1000  # ms
        memory_after = process.memory_info().rss / 1024 / 1024
        
        self.metrics = {
            'inference_time_ms': inference_time,
            'memory_usage_mb': memory_after - memory_before,
            'throughput_fps': 1000 / inference_time
        }
        
        if torch.cuda.is_available():
            gpu_memory_after = torch.cuda.memory_allocated() / 1024 / 1024
            self.metrics['gpu_memory_mb'] = gpu_memory_after - gpu_memory_before
        
        return self.metrics
\`\`\`

## Best Practices Checklist

### Pre-Deployment
- [ ] Profile your model's performance baseline
- [ ] Identify bottlenecks in your inference pipeline
- [ ] Choose appropriate optimization techniques
- [ ] Validate optimized model accuracy
- [ ] Test on target hardware

### Production Considerations
- [ ] Implement model versioning
- [ ] Set up monitoring and alerting
- [ ] Plan for model updates and rollbacks
- [ ] Consider A/B testing for model comparisons
- [ ] Document performance characteristics

### Optimization Workflow
1. **Baseline**: Measure original model performance
2. **Optimize**: Apply techniques incrementally
3. **Validate**: Ensure accuracy is maintained
4. **Deploy**: Test in staging environment
5. **Monitor**: Track production performance

## Conclusion

Optimizing deep learning models for production is both an art and a science. The key is finding the right balance between model performance and deployment constraints while maintaining the quality your users expect.

Start with profiling your baseline, apply optimizations incrementally, and always validate your results. Remember that the "best" optimization depends heavily on your specific use case, hardware constraints, and performance requirements.

The field of model optimization is rapidly evolving, with new techniques and tools emerging regularly. Stay informed about the latest developments and continuously evaluate new optimization strategies as they become available.`,
    author: "Gyanaranjan Das",
    authorAvatar: "👨‍💻",
    publishedAt: new Date("2024-01-05"),
    tags: [
      "Deep Learning",
      "ML Optimization",
      "Production ML",
      "TensorFlow",
      "PyTorch",
    ],
    category: "AI/ML",
    readTime: 15,
    likes: 89,
    views: 3200,
    comments: [
      {
        id: "c5",
        author: "David Park",
        avatar: "🤖",
        content:
          "Incredible depth! The quantization examples are exactly what I needed for our mobile deployment. Thanks for sharing!",
        timestamp: new Date("2024-01-06"),
        likes: 15,
      },
    ],
    featured: false,
    coverImage:
      "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=400&fit=crop",
  },
];

// Blog management functions with dynamic data and persistence
export class BlogManager {
  private posts: BlogPost[] = [];
  private nextId = 4;
  private storageKey = "gyan-blog-data";
  private userInteractionsKey = "gyan-blog-interactions";

  constructor() {
    this.loadData();
    this.startOrganicGrowthSimulation();
  }

  private loadData(): void {
    try {
      const savedData = localStorage.getItem(this.storageKey);
      if (savedData) {
        const parsed = JSON.parse(savedData);
        this.posts = parsed.map((post: any) => ({
          ...post,
          publishedAt: new Date(post.publishedAt),
          updatedAt: post.updatedAt ? new Date(post.updatedAt) : undefined,
          comments: post.comments.map((comment: any) => ({
            ...comment,
            timestamp: new Date(comment.timestamp),
            replies: comment.replies?.map((reply: any) => ({
              ...reply,
              timestamp: new Date(reply.timestamp),
            })),
          })),
        }));
      } else {
        this.posts = [...mockBlogPosts];
        this.saveData();
      }
    } catch (error) {
      console.error("Failed to load blog data:", error);
      this.posts = [...mockBlogPosts];
    }
  }

  private saveData(): void {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.posts));
    } catch (error) {
      console.error("Failed to save blog data:", error);
    }
  }

  private getUserInteractions(): Set<string> {
    try {
      const saved = localStorage.getItem(this.userInteractionsKey);
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  }

  private saveUserInteraction(postId: string, action: string): void {
    try {
      const interactions = this.getUserInteractions();
      interactions.add(`${postId}-${action}`);
      localStorage.setItem(
        this.userInteractionsKey,
        JSON.stringify([...interactions]),
      );
    } catch (error) {
      console.error("Failed to save user interaction:", error);
    }
  }

  private hasUserInteracted(postId: string, action: string): boolean {
    const interactions = this.getUserInteractions();
    return interactions.has(`${postId}-${action}`);
  }

  private startOrganicGrowthSimulation(): void {
    // Simulate organic growth every 10 seconds
    setInterval(() => {
      this.posts.forEach((post) => {
        // Random chance to increase views (simulating real visitors)
        if (Math.random() < 0.3) {
          post.views += Math.floor(Math.random() * 3) + 1;
        }

        // Smaller chance for likes
        if (Math.random() < 0.1) {
          post.likes += Math.floor(Math.random() * 2);
        }
      });
      this.saveData();
    }, 10000); // Every 10 seconds
  }

  getAllPosts(): BlogPost[] {
    return this.posts.sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime(),
    );
  }

  getFeaturedPosts(): BlogPost[] {
    return this.posts.filter((post) => post.featured);
  }

  getPostBySlug(slug: string): BlogPost | undefined {
    return this.posts.find((post) => post.slug === slug);
  }

  getPostsByCategory(category: string): BlogPost[] {
    return this.posts.filter((post) => post.category === category);
  }

  getPostsByTag(tag: string): BlogPost[] {
    return this.posts.filter((post) => post.tags.includes(tag));
  }

  addComment(
    postId: string,
    comment: Omit<Comment, "id" | "timestamp" | "likes">,
  ): boolean {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) return false;

    const newComment: Comment = {
      ...comment,
      id: `c${Date.now()}`,
      timestamp: new Date(),
      likes: 0,
    };

    post.comments.push(newComment);
    this.saveData();
    return true;
  }

  likePost(postId: string): boolean {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) return false;

    // Check if user already liked this post
    if (this.hasUserInteracted(postId, "like")) {
      return false; // Already liked
    }

    post.likes += 1;
    this.saveUserInteraction(postId, "like");
    this.saveData();
    return true;
  }

  incrementViews(postId: string): boolean {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) return false;

    // Only count unique views per session
    const viewKey = `view-${Date.now()}`;
    if (!this.hasUserInteracted(postId, viewKey)) {
      post.views += 1;
      this.saveUserInteraction(postId, viewKey);
      this.saveData();
    }
    return true;
  }

  likeComment(postId: string, commentId: string): boolean {
    const post = this.posts.find((p) => p.id === postId);
    if (!post) return false;

    const comment = post.comments.find((c) => c.id === commentId);
    if (!comment) return false;

    if (this.hasUserInteracted(commentId, "like")) {
      return false; // Already liked
    }

    comment.likes += 1;
    this.saveUserInteraction(commentId, "like");
    this.saveData();
    return true;
  }

  hasUserLikedPost(postId: string): boolean {
    return this.hasUserInteracted(postId, "like");
  }

  hasUserLikedComment(commentId: string): boolean {
    return this.hasUserInteracted(commentId, "like");
  }

  getAllCategories(): string[] {
    return [...new Set(this.posts.map((post) => post.category))];
  }

  getAllTags(): string[] {
    return [...new Set(this.posts.flatMap((post) => post.tags))];
  }

  // Real-time data for components
  subscribeToUpdates(callback: () => void): () => void {
    const interval = setInterval(callback, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }
}

export const blogManager = new BlogManager();
