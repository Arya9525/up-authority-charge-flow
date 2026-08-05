# UP Authority Connect

You are an expert Product Designer, UX Designer and Full Stack Solution Architect.

Design a modern, enterprise-grade, government-level web application prototype for a "Development Authority User Charge Management System" for Uttar Pradesh Development Authorities (such as Noida Authority, Ghaziabad Development Authority, Lucknow Development Authority, etc.).

This is NOT a coding task. Create a complete high-fidelity clickable prototype with realistic sample data, modern dashboards, forms, tables, charts, reports, and navigation.

The application should look like a real production-ready Government ERP solution.

====================================================

PROJECT OVERVIEW

====================================================

Development Authorities have multiple housing schemes.

Each scheme contains multiple plots of different sizes.

Some plots are allotted to citizens while others remain vacant.

User Charges are applicable ONLY on allotted plots.

Monthly User Charges are calculated based on:

Monthly User Charge = Plot Area (Sq. Meter) × Applicable Rate per Sq. Meter

Authorities currently collect charges annually through offline methods.

The new portal should allow:

• Monthly demand generation

• Monthly online payment

• Automatic arrear calculation

• Online receipt generation

• Online bill download

If rates change in future years, previously generated arrears must NOT be recalculated.

Old dues must retain the historical rate applicable at the time of bill generation.

====================================================

ROLES

====================================================

Create two separate portals.

1. Admin Portal

2. Allottee Self-Service Portal

====================================================

ADMIN PORTAL

====================================================

Create a professional left sidebar.

Menu

• Dashboard

• Scheme Management

• Plot Management

• Plot Allotment

• Allottee Management

• Rate Master

• Monthly Demand Generation

• Bills

• Payments

• Reports

• User Management

• Settings

====================================================

ADMIN DASHBOARD

====================================================

Top KPI Cards

Total Schemes

Total Plots

Allotted Plots

Vacant Plots

Monthly Demand

Current Collection

Outstanding Due

Pending Arrear

Recovery %

Charts

Monthly Collection Trend

Monthly Demand Trend

Collection vs Demand

Scheme Wise Collection

Payment Status

Heat Map

Use beautiful interactive charts.

====================================================

SCHEME MANAGEMENT

====================================================

Table

Scheme Code

Scheme Name

Authority

Location

Total Plots

Status

Actions

Buttons

Add Scheme

Edit

Delete

View

====================================================

PLOT MANAGEMENT

====================================================

Fields

Scheme

Plot Number

Sector

Category

Area (Sq Meter)

Road Width

Corner Plot

Status

Vacant

Allotted

Buttons

Add Plot

Edit Plot

====================================================

PLOT ALLOTMENT

====================================================

Fields

Select Scheme

Select Plot

Plot Area

Allottee Name

Father Name

Mobile Number

Email

Address

Aadhaar Number

PAN Number

Occupation

Allotment Date

Possession Date

User Charge Start Date

Status

Buttons

Save

Update

Cancel

====================================================

RATE MASTER

====================================================

Maintain yearly rates.

Fields

Effective From Date

Rate Per Sq Meter

Remarks

Status

Historical rates must remain unchanged.

Changing rates should affect only future monthly demands.

====================================================

MONTHLY DEMAND GENERATION

====================================================

Generate monthly bills automatically for all allotted plots.

Each generated bill must permanently store:

Scheme

Plot

Month

Year

Area

Rate Used

Monthly Charge

Arrear

Current Due

Total Due

Bill Status

Generate Monthly Demand button

====================================================

BILL MANAGEMENT

====================================================

Search Bills

Filter

Scheme

Month

Year

Status

Buttons

View Bill

Download PDF

Print

====================================================

PAYMENTS

====================================================

Payment Screen

Payment Gateway UI

Payment Modes

UPI

Net Banking

Credit Card

Debit Card

Receipt Generation

Transaction ID

Payment Date

Amount

Status

Generate Digital Receipt

====================================================

REPORTS

====================================================

Collection Report

Demand Report

Current Due Report

Pending Arrear Report

Scheme Wise Collection

Monthly Collection

Recovery Percentage

Defaulter List

Daily Collection

Monthly Collection

Yearly Collection

Export

PDF

Excel

====================================================

HEAT MAP

====================================================

Display Scheme Wise Recovery

Green = Excellent

Yellow = Average

Orange = Poor

Red = Critical

====================================================

ALLOTTEE SELF SERVICE PORTAL

====================================================

Dashboard

Welcome Card

Profile Summary

Plot Details

Scheme

Plot Number

Area

Current Month Bill

Pending Arrear

Total Due

Buttons

Pay Online

Download Bill

Download Receipt

Payment History

====================================================

ONLINE PAYMENT

====================================================

Simple payment page.

Outstanding Amount

Current Bill

Arrear

Grand Total

Pay Now

Success Page

Receipt Download

====================================================

PAYMENT HISTORY

====================================================

Table

Receipt Number

Payment Date

Amount

Transaction ID

Status

Download Receipt

====================================================

NOTIFICATIONS

====================================================

Bill Generated

Payment Successful

Payment Failed

Reminder for Pending Bills

Reminder for Arrear

====================================================

DESIGN REQUIREMENTS

====================================================

Create a premium enterprise UI.

Use modern Government ERP styling.

Use Material Design principles.

Use glassmorphism KPI cards.

Use elegant icons.

Use responsive layout.

Use professional typography.

Use realistic government sample data.

Use search bars, filters, tables, breadcrumbs, badges, status chips, modals and pagination.

Use blue, white and subtle grey color palette suitable for Government portals.

Use dashboard animations and interactive charts.

Use professional UX suitable for IAS officers, Development Authority officials and citizens.

The application should feel like a production-ready Smart Government Portal.

Make every screen interconnected with proper navigation.

The prototype should be presentation-ready for senior management and government stakeholders.

Create a polished, premium, modern experience comparable to NIC, Smart City Mission dashboards, DigiLocker, and enterprise ERP applications.

Focus on exceptional UI/UX, clarity, accessibility, and executive-level presentation quality.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://up-authority-charge-flow.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/5e2bd358-f1a7-4e7b-830a-8d7d882bb0ee).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
