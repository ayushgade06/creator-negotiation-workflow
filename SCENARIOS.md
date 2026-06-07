---

### Scenario 1: Interested Creator

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "Thanks for reaching out. I'd love to participate in this campaign."
}
```

**Expected:** stage: INTERESTED, action: APPROVE, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a2560fe33bf47ee99950634",
    "currentStage": "INTERESTED",
    "intent": "INTERESTED",
    "recommendedAction": "APPROVE",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.95,
    "enthusiasmScore": 98,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed interest in participating in the campaign and is currently at the interested stage. The business has decided to approve their involvement.",
    "draftReply": "Hi Sarah, thank you for your interest! We're excited to have you on board. Your participation will be a great addition to our campaign. We look forward to working with you.",
    "reasoningSummary": "Creator request falls within campaign budget."
  }
}
```

---

### Scenario 2: Compensation Within Budget

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "I'd be interested. I normally charge $80 for a TikTok video."
}
```

**Expected:** stage: NEGOTIATING, action: APPROVE, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a2561e233bf47ee99950639",
    "currentStage": "NEGOTIATING",
    "intent": "NEGOTIATE_COMPENSATION",
    "recommendedAction": "APPROVE",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.95,
    "enthusiasmScore": 82,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed interest and requested $80 for the TikTok video, which is within the approved budget range. The conversation is currently in negotiation but has been approved.",
    "draftReply": "Hi Sarah, thanks for your interest! Your fee of $80 is within our campaign budget. We're excited to move forward with you creating a TikTok video showcasing friends playing Uno Card Game. Let's get started!",
    "reasoningSummary": "Creator request falls within campaign budget."
  }
}
```

---

### Scenario 3: Compensation Slightly Over Budget

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "I'd be interested in this campaign. My typical rate is $150 per TikTok video."
}
```

**Expected:** stage: INTERESTED, action: COUNTER_OFFER, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a25624f33bf47ee9995063e",
    "currentStage": "INTERESTED",
    "intent": "NEGOTIATE_COMPENSATION",
    "recommendedAction": "COUNTER_OFFER",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.98,
    "enthusiasmScore": 82,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed interest in the campaign and requested $150 for a TikTok video. The conversation is currently in compensation negotiation, with a counter-offer pending.",
    "draftReply": "Thank you, Sarah, for your interest! While we appreciate your rate, the campaign budget is currently set between $0 and $100. Let's discuss a fee closer to this range to ensure both parties are satisfied.",
    "reasoningSummary": "Requested fee exceeds campaign budget."
  }
}
```

---

### Scenario 4: Compensation Far Above Budget (Human Review)

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "Hey, thanks for reaching out. I'd be interested, but I usually charge $300 for a TikTok video. Is there any flexibility on the budget?"
}
```

**Expected:** stage: NEGOTIATING, action: HUMAN_REVIEW, requiresHumanApproval: true (fee is 3x budget)

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a25631d33bf47ee99950643",
    "currentStage": "NEGOTIATING",
    "intent": "NEGOTIATE_COMPENSATION",
    "recommendedAction": "HUMAN_REVIEW",
    "requiresHumanApproval": true,
    "workflowStatus": "WAITING_HUMAN",
    "confidence": 0.98,
    "enthusiasmScore": 82,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed interest in the project and requested $300 for a TikTok video, indicating potential budget flexibility. The conversation is currently in negotiation and has been escalated for human review.",
    "draftReply": "Thanks for sharing your rates and your interest in this campaign.\n\nYour compensation request has been forwarded to our partnerships team for internal review.\n\nWe'll review the details and follow up with next steps as soon as possible.\n\nThank you for your patience.",
    "reasoningSummary": "Requested fee exceeds twice the campaign budget."
  }
}
```

---

### Scenario 5: Requesting More Information

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "Could you share more information about deliverables, timelines, and content requirements?"
}
```

**Expected:** stage: NEEDS_MORE_INFORMATION, action: PROVIDE_INFORMATION, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a25636a33bf47ee99950648",
    "currentStage": "NEEDS_MORE_INFORMATION",
    "intent": "REQUEST_INFORMATION",
    "recommendedAction": "PROVIDE_INFORMATION",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.97,
    "enthusiasmScore": 60,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator requested details on deliverables, timelines, and content requirements. The conversation is currently at the stage of needing more information before proceeding.",
    "draftReply": "Based on the current brief, your deliverable will be a short TikTok video showing friends playing the Uno Card Game. The commission for this project is 30%, and the fixed fee range is $0-$100. Unfortunately, the campaign timeline has not yet been specified in the current brief.",
    "reasoningSummary": "Creator requested additional campaign information."
  }
}
```

---

### Scenario 6: Not Interested

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "Thank you for reaching out, but I'll pass on this opportunity."
}
```

**Expected:** stage: NOT_INTERESTED, action: CLOSE_CONVERSATION, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a2564a733bf47ee9995064d",
    "currentStage": "NOT_INTERESTED",
    "intent": "DECLINE_COLLABORATION",
    "recommendedAction": "CLOSE_CONVERSATION",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.98,
    "enthusiasmScore": 5,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator declined the collaboration opportunity. The conversation is now closed as there is no further interest.",
    "draftReply": "Thank you, Sarah, for considering our campaign. We appreciate your interest and understand that this opportunity may not be the right fit at this time. Best of luck with your TikTok channel!",
    "reasoningSummary": "Creator declined collaboration opportunity."
  }
}
```

---

### Scenario 7: High Risk Request

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "I'll only participate if payment is sent in full before any content is created."
}
```

**Expected:** stage: NEGOTIATING, action: HUMAN_REVIEW, requiresHumanApproval: true, riskLevel: HIGH

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a25650a33bf47ee99950652",
    "currentStage": "NEGOTIATING",
    "intent": "NEGOTIATE_COMPENSATION",
    "recommendedAction": "HUMAN_REVIEW",
    "requiresHumanApproval": true,
    "workflowStatus": "WAITING_HUMAN",
    "confidence": 0.98,
    "enthusiasmScore": 70,
    "riskLevel": "HIGH",
    "negotiationFatigue": false,
    "conversationSummary": "Creator insisted on full payment upfront before creating any content, which is being reviewed for approval. The conversation is currently in negotiation and has been escalated for human review.",
    "draftReply": "Thanks for sharing your rates and your interest in this campaign.\n\nYour compensation request has been forwarded to our partnerships team for internal review.\n\nWe'll review the details and follow up with next steps as soon as possible.\n\nThank you for your patience.",
    "reasoningSummary": "High risk creator response detected."
  }
}
```

---

### Scenario 8: Highly Enthusiastic Creator

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "This sounds amazing! I'd absolutely love to be part of this campaign."
}
```

**Expected:** stage: INTERESTED, action: APPROVE, requiresHumanApproval: false, enthusiasmScore: high

---

### Scenario 9: Creator Asking About Product Shipping

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "Will the product be shipped to me, and when should I expect delivery?"
}
```

**Expected:** stage: INTERESTED, action: APPROVE, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a25654033bf47ee99950657",
    "currentStage": "INTERESTED",
    "intent": "INTERESTED",
    "recommendedAction": "APPROVE",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.95,
    "enthusiasmScore": 98,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed strong interest in the campaign and is willing to participate. The decision has been made to approve their involvement.",
    "draftReply": "Hi Sarah, thank you so much for your interest! We're excited to have you on board. Your participation will be a great addition to our campaign. Looking forward to seeing your TikTok video featuring friends playing Uno Card Game.",
    "reasoningSummary": "Creator request falls within campaign budget."
  }
}
```

---

### Scenario 10: Mixed Interest and Questions

**Input:**

```json
{
  "creator": { "name": "Sarah", "platform": "TikTok", "followers": 25000 },
  "campaign": {
    "product": "Uno Card Game",
    "commission": "30%",
    "fixedFeeRange": "$0-$100",
    "brief": "Creator should make a short TikTok showing friends playing the card game."
  },
  "latestMessage": "I'm interested. Can you tell me more about the content requirements and posting timeline?"
}
```

**Expected:** stage: NEEDS_MORE_INFORMATION, action: PROVIDE_INFORMATION, requiresHumanApproval: false

**Output:**

```json
{
  "success": true,
  "data": {
    "conversationId": "6a2567ba33bf47ee9995065c",
    "currentStage": "NEEDS_MORE_INFORMATION",
    "intent": "REQUEST_INFORMATION",
    "recommendedAction": "PROVIDE_INFORMATION",
    "requiresHumanApproval": false,
    "workflowStatus": "ACTIVE",
    "confidence": 0.97,
    "enthusiasmScore": 78,
    "riskLevel": "LOW",
    "negotiationFatigue": false,
    "conversationSummary": "The creator expressed interest in the project and requested information on content requirements and posting timeline. The conversation is currently at the stage of providing necessary details.",
    "draftReply": "Based on the current brief, you'll be creating a short TikTok video showing friends playing the Uno Card Game. The commission for this campaign is 30%, and the fixed fee range is $0-$100. Unfortunately, the posting timeline has not yet been specified in the current brief.",
    "reasoningSummary": "Creator requested additional campaign information."
  }
}
```

---