---
name: FOLIO
summary: A quantum portfolio optimisation project, currently focused on improving computation efficiency.
category: Finance & quantum optimisation
status: in-progress
order: 2
published: true
updatedAt: '2026-11-11'
currentFocus: Improving the efficiency of quantum computation in the portfolio optimiser.
tags: [Quantum optimisation, FinTech, Hybrid algorithms]
stack: [Python, Qiskit, IBM Quantum Runtime, NumPy, SciPy, FastAPI, React]
liveUrl: https://folio-8ott.onrender.com/
note: Educational optimisation project. The interface is a demonstration, not investment advice.
---

## A constrained decision problem

Choosing an allocation across assets introduces competing objectives: potential return, risk, and a finite budget. FOLIO explores how that allocation problem can be expressed for a hybrid quantum-classical optimisation approach, then presented through an interactive web application.

The project connects mathematical formulation with an application people can inspect. Its dashboard brings market information into view, while the setup and run workflow provide an entry point to the optimiser.

## From allocation to optimisation

The technical approach includes a Quadratic Unconstrained Binary Optimisation (QUBO) formulation and the Quantum Approximate Optimisation Algorithm (QAOA). Python and Qiskit support the optimisation work, with FastAPI and React connecting the computation to the web interface.

The project also explores comparison with classical portfolio optimisation. That comparison matters because the quality of a quantum approach needs to be assessed against a meaningful alternative, alongside the cost of running it.

## Recognition

FOLIO received first place at the Syrus7 Hackathon. The project brings together an optimisation problem, a technical implementation, and an interface for explaining the result.

## What I’m working on now

I’m continuing to improve the quantum computation in FOLIO, with computation efficiency as the current focus. The project remains in progress; this case study will grow alongside the implementation and its evaluation.

FOLIO is an educational project. Displayed historical values and optimisation outputs should be understood in that context, rather than as forecasts or investment recommendations.
