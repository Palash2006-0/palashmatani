---
name: Flér
summary: A flight-booking project exploring fare prediction and workflows for finding lower prices.
category: Travel & predictive systems
status: in-progress
order: 3
published: true
updatedAt: '2026-11-11'
currentFocus: Building fare discovery, prediction, and booking workflows.
tags: [Travel, Fare prediction, Booking workflows]
stack: [AWS Lambda, Step Functions, DynamoDB, Cognito, EventBridge, SES]
liveUrl: https://fibook-ten.vercel.app/
note: College project / demo. Payments run in test mode.
---

## The timing problem in flight booking

Finding a flight is one part of the decision. Deciding when to book is another. Flér explores that second problem through a flight-search experience, fare predictions, and target-price monitoring workflows.

The aim is to help a traveller reason about changing prices and a booking deadline. It is an active college project, with payments running in test mode.

## From search to a fare decision

The public interface starts with the familiar details: origin, destination, dates, and travellers. Its Fare Lock concept adds a target price and a book-by deadline, connecting a prediction to a proposed action.

That workflow makes the prediction part of a broader product decision. A fare estimate is useful only when the traveller can understand what it means for their route and time window. The interface therefore pairs search with an explanation of the model and its evaluation.

## How the prediction is described

The project’s public model card describes per-route fare patterns, mean-reverting price variation, and Monte Carlo simulation. Simulated future price paths are used to estimate the likelihood of reaching a target fare before a deadline.

The site describes an AWS-based workflow using Lambda, Step Functions, DynamoDB, Cognito, EventBridge, and SES. These services are presented as part of the project architecture; the public demo provides a view into the intended booking and monitoring experience.

## Evaluation is part of the product

Flér exposes its method, backtest, and calibration through a [public model explanation](https://fibook-ten.vercel.app/ai). That makes evaluation a visible part of the experience and gives the project a place to explain how useful its probabilities are.

Performance needs to be read against a baseline and within the tested time period. The model is experimental, and a fare prediction should not be treated as a guarantee of the lowest possible price. Current work continues across fare discovery, prediction, and booking workflows.
