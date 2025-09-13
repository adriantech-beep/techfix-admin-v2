# Feature Specification – Upload Solutions

## Overview

This feature allows technicians or learners to create and upload repair solutions for any phone or laptop device.  
Each solution includes device details, issue description, difficulty rating, and step-by-step repair instructions.  
The goal is to build a searchable knowledge base that benefits both beginners and industry professionals.

## User Story

As a **technician/user**,  
I want to **upload solutions on any kind of phone/laptop device depending on the issue and difficulty**,  
so that **learners or even professionals in the industry will be guided on the repair process**.

## Requirements

- [ ] User can fill out a form with:
  - Device type (phone/laptop)
  - Brand and model
  - Issue description
  - Difficulty level (Easy, Medium, Hard)
  - Step-by-step solution (text or rich text)
  - Optional: attach images (e.g., board photos, jumper ways)
- [ ] Data is stored in the database
- [ ] Each solution entry has timestamps (created_at, updated_at)
- [ ] Solution can be retrieved later in the guide list or by search

## Validations / Constraints

- [ ] All required fields (device, model, issue, solution steps) must be filled
- [ ] Title length >= 5 characters
- [ ] Step-by-step solution length >= 20 characters
- [ ] Images (if uploaded) must be under 5MB and in JPG/PNG format
- [ ] Difficulty must be one of: Easy, Medium, Hard

## Acceptance Criteria

- [ ] User can successfully submit a solution and see confirmation
- [ ] Submitted solution appears in the guide list
- [ ] Invalid input (e.g., missing title, empty solution) shows validation error
- [ ] Data persists in the database and is retrievable after page reload
- [ ] Optional images are stored and displayed with the solution

## Notes

- Future enhancement: add AI-assisted auto-tagging (e.g., suggest common issues like “Charging,” “No Power,” “Display”).
- Future enhancement: allow community upvotes/downvotes to rank solutions.
- Related links: See `/docs/architecture/system-architecture.md` for how backend handles file uploads.
