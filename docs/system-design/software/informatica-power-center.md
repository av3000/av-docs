# Informatica PowerCenter

Documentations:
[https://docs.informatica.com/data-integration/powercenter.html](https://docs.informatica.com/data-integration/powercenter.html)
[https://www.javatpoint.com/informatica-powercenter](https://www.javatpoint.com/informatica-powercenter)
[What is a data mart | Oracle](https://www.oracle.com/autonomous-database/what-is-data-mart/)
Modern alternative - [Google BigQuery](https://cloud.google.com/bigquery/)
[What's the Difference Between a Data Warehouse, Data Lake, and Data Mart?](https://aws.amazon.com/compare/the-difference-between-a-data-warehouse-data-lake-and-data-mart/)

**Informatica PowerCenter** is an ETL (Extract, Transform, Load) tool used for integrating and managing data from multiple sources, such as recent changes or new entries, allowing organizations to build enterprise Data Warehouses or Data Marts and enable data analytics.
It provides functionalities for data extraction, transformation, and loading, also known as ETL pipelines, to support data-driven decision-making.

## Data Extraction

The Extract phase involves gathering raw data from various source systems. In this CRM architecture, the source data can include:

- Transactional Databases (customer interactions, financial transactions, product details).
- External Systems (other banking services or client records).
- Kafka Events: Events, like the "snooze" action, are captured and stored temporarily as messages in Kafka topics and may be pulled in by Informatica to ensure the CRM Data Mart is up-to-date.

Informatica extracts data by connecting to these sources (Oracle, flat files, or Kafka), typically by running scheduled or triggered jobs that pull only the necessary data, such as recent changes or new entries.

Example:

- A new client interaction record is created in a transactional database or logged as an event in Kafka.
- Informatica connects to the source, queries this new interaction, and extracts the raw data fields (client ID, interaction type, date, advisor ID, etc.)

## Data Transformation

The Transform phase is where business logic is applied. This is where Informatica cleans, formats, and enriches the data to make it consistent and useful for CRM analysis. Transformations may include:

- Data Cleansing: Removing duplicates, handling missing data, and standardizing formats (dates or names).
- Business Logic Application: Converting raw data into meaningful insights (categorizing interaction types, adding calculated fields like “days since last contact”).
- Aggregation: Summing or averaging values to create summary records (monthly interaction counts per client).
- Joining Data: Merging data from different sources, like combining client transaction records with profile information.
- Data Enrichment: Adding derived fields (identifying a high-value client based on transaction frequency).

Informatica performs these transformations within its ETL pipelines. These pipelines are designed with transformations that may contain SQL queries, functions, or built-in data processing operations to meet business needs.

Example:

If the snooze action was triggered, Informatica might:

- Update or calculate fields like `next_contact_date` based on the snooze duration.
- Convert the snooze date into a format compatible with the CRM Data Mart.
- Link the snooze action with the advisor’s ID, so future reports can show who delayed client interactions.

## Load

The Load phase involves loading the transformed data into the target database (in this case, the CRM Data Mart within Oracle DB).

The Load step can be incremental (loading only the new or updated data) or full (loading all data), depending on requirements. Once data is loaded, it becomes available for querying, reporting, or analytics.

Example:

- After processing a client snooze event, Informatica inserts or updates the client’s `next_contact_date` field in the CRM Data Mart.
- This updated field will inform reports and applications when the advisor should contact the client next.
