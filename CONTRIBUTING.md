# Contributing to To-Do List Web Application

Thank you for your interest in contributing to our To-Do List Web Application! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### 1. Fork the Repository
- Click the "Fork" button on the GitHub repository page
- Clone your forked repository to your local machine

### 2. Set Up Development Environment
```bash
# Clone your fork
git clone https://github.com/your-username/to-do-list-web-application.git
cd to-do-list-web-application

# Set up the project
docker-compose up -d
cd backend && npm install
cd ../frontend && npm install
```

### 3. Create a Feature Branch
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name

# For bug fixes
git checkout -b bugfix/your-bug-fix-name

# For hotfixes
git checkout -b hotfix/your-hotfix-name
```

### 4. Make Your Changes
- Write clean, readable code
- Follow the existing code style and conventions
- Add tests for new features
- Update documentation as needed

### 5. Test Your Changes
```bash
# Backend tests
cd backend && npm test

# Frontend tests
cd frontend && npm test

# Run the application
cd backend && npm run dev
cd frontend && npm run dev
```

### 6. Commit Your Changes
```bash
# Add your changes
git add .

# Commit with a descriptive message
git commit -m "feat: add user profile management feature"

# Push to your fork
git push origin feature/your-feature-name
```

### 7. Create a Pull Request
- Go to your fork on GitHub
- Click "New Pull Request"
- Select the base branch (usually `develop`)
- Write a clear description of your changes
- Link any related issues

## 📝 Commit Message Convention

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Types:
- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Changes to the build process or auxiliary tools

### Examples:
```
feat: add user authentication system
fix: resolve login validation issue
docs: update API documentation
style: format code according to style guide
refactor: simplify user model validation
test: add unit tests for todo controller
```

## 🧪 Testing Guidelines

### Backend Testing
- Write unit tests for all new functions
- Test API endpoints with different scenarios
- Ensure proper error handling
- Test database operations

### Frontend Testing
- Test component rendering
- Test user interactions
- Test API integration
- Test responsive design

### Test Coverage
- Aim for at least 80% test coverage
- Test both success and error scenarios
- Include integration tests

## 📋 Code Style Guidelines

### JavaScript/Node.js
- Use ES6+ features
- Follow Airbnb JavaScript Style Guide
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

### React
- Use functional components with hooks
- Follow React best practices
- Use TypeScript for type safety (if applicable)
- Keep components small and focused

### Database
- Use meaningful table and column names
- Add proper indexes for performance
- Include foreign key constraints
- Document complex queries

## 🔍 Code Review Process

1. **Self-Review**: Review your own code before submitting
2. **Peer Review**: At least one team member reviews your PR
3. **Automated Checks**: CI/CD pipeline runs tests and linting
4. **Approval**: PR requires approval from maintainers

### Review Checklist:
- [ ] Code follows project conventions
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance considerations addressed
- [ ] Error handling is proper

## 🐛 Reporting Bugs

### Before Reporting:
1. Check existing issues
2. Try to reproduce the bug
3. Check the documentation

### Bug Report Template:
```markdown
**Bug Description:**
Brief description of the issue

**Steps to Reproduce:**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior:**
What should happen

**Actual Behavior:**
What actually happens

**Environment:**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 90]
- Node.js version: [e.g., 18.0.0]

**Additional Information:**
Screenshots, logs, etc.
```

## 💡 Feature Requests

### Before Requesting:
1. Check if the feature already exists
2. Consider if it aligns with project goals
3. Think about implementation complexity

### Feature Request Template:
```markdown
**Feature Description:**
Brief description of the feature

**Use Case:**
Why this feature is needed

**Proposed Implementation:**
How you think it should be implemented

**Alternatives Considered:**
Other approaches you considered

**Additional Information:**
Mockups, examples, etc.
```

## 📞 Getting Help

- **GitHub Issues**: For bugs and feature requests
- **Discussions**: For questions and general discussion
- **Documentation**: Check the README and API docs first

## 🏆 Recognition

Contributors will be recognized in:
- Project README
- Release notes
- GitHub contributors page

## 📄 License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to our project! 🎉 