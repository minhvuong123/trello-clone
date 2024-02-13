import { OrgControl } from "./_components/org-control";

const OrganizationIdLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {/* update organization by typing the url http://localhost:3000/organization/org_2cJPVil1Y0IQjbh0epMp6dApq8r */}
      <OrgControl /> 
      { children }
    </>
  )
}

export default OrganizationIdLayout;