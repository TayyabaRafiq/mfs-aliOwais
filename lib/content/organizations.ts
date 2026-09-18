/**
 * Organizations/clients served, transcribed from company-facts.md.
 *
 * `relationshipLabel` is deliberately a closed union of a single neutral
 * value (FR-022): no organization here may be described as a "partner,"
 * "approved vendor," "government partner," or similar stronger relationship
 * unless that exact wording is added to company-facts.md first.
 *
 * `historicalNote` is only set for NBP and Meezan Bank, using wording that
 * matches company-facts.md and spec.md FR-023/FR-024 verbatim — historical
 * enlistment must never be presented as a current relationship.
 */

export type RelationshipLabel = "served";

export interface OrganizationReference {
  name: string;
  relationshipLabel: RelationshipLabel;
  historicalNote?: string;
}

export const organizations: OrganizationReference[] = [
  {
    name: "National Bank of Pakistan (NBP)",
    relationshipLabel: "served",
    historicalNote:
      "Historical enlistment: Category \"D\" contractor panel for 2013 (per a 2012 renewal-of-enlistment document), and Category \"B\" contractor for fumigation works of bank offices and branches, January 2017 – December 2017 (per a 2016 enlistment certificate). This reflects documented historical enlistment, not a current relationship.",
  },
  {
    name: "Meezan Bank",
    relationshipLabel: "served",
    historicalNote:
      "A fumigation and pest-control certificate documents work performed at a Meezan Bank cafeteria.",
  },
  { name: "MCB Bank", relationshipLabel: "served" },
  { name: "Iqra University", relationshipLabel: "served" },
  { name: "Board of Secondary Education", relationshipLabel: "served" },
  { name: "FBR Building", relationshipLabel: "served" },
  { name: "Novonodec", relationshipLabel: "served" },
  { name: "Allied Record Pvt. Ltd. warehouses", relationshipLabel: "served" },
  { name: "Taj Gasoline", relationshipLabel: "served" },
  { name: "Pakistan Cold Storage", relationshipLabel: "served" },
  { name: "Restaurants", relationshipLabel: "served" },
  { name: "Schools", relationshipLabel: "served" },
  { name: "Corporate organizations", relationshipLabel: "served" },
  { name: "Other local businesses and institutions", relationshipLabel: "served" },
];
