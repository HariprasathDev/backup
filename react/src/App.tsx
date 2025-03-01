import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, Navigate } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';

import ECommerce from './pages/Dashboard/ECommerce';
import DataTable from './components/new_profile/DataTable';
import DefaultLayout from './layout/DefaultLayout';
import Approved_List from './components/new_profile/Approved_List';
import CountryTable from './components/CountryTable';
import StateTable from './components/StateTable';
import DistrictTable from './components/DistrictTable';
import PlaceOfBirthList from './components/PlaceOfBirthList';
import DasaBalanceList from './components/DasaBalanceList';
import LagnamList from './components/LagnamList';
import RasiList from './components/RasiList';
import CasteTable from './components/CasteTable';
import ReligionTable from './components/ReligionTable';
import BirthStarList from './components/BirthStarList';
import ProfileholderTable from './components/ProfileholderTable';
import ParentsoccupationTable from './components/ParentsoccupationTable';
import HighesteducationsTable from './components/HighesteducationsTable';
import UgdegreeTable from './components/UgdegreeTable';
import AnnualincomesTable from './components/AnnualincomesTable';
import ProfileForm from './components/new_profile/AddProfile';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <Routes>
      <Route
        path="*"
        element={
          <DefaultLayout>
            <Routes>
              <Route
                index
                element={
                  <>
                    <PageTitle title="" />
                    <ECommerce />
                  </>
                }
              />
              <Route
                path="/ECommerce"
                element={
                  <>
                    <PageTitle title="ECommerce" />
                    <ECommerce />
                  </>
                }
              />

              <Route
                path="/DataTable"
                element={
                  <>
                    <PageTitle title="DataTable" />
                    <DataTable />
                  </>
                }
              />
              <Route
                path="/Approved_List"
                element={
                  <>
                    <PageTitle title="Approved List" />
                    <Approved_List />
                  </>
                }
              />
              <Route
                path="/CountryTable"
                element={
                  <>
                    <PageTitle title="CountryTable" />
                    <CountryTable />
                  </>
                }
              />
              <Route
                path="/StateTable"
                element={
                  <>
                    <PageTitle title="StateTable" />
                    <StateTable />
                  </>
                }
              />
              <Route
                path="/DistrictTable"
                element={
                  <>
                    <PageTitle title="DistrictTable" />
                    <DistrictTable />
                  </>
                }
              />
              <Route
                path="/CasteTable"
                element={
                  <>
                    <PageTitle title="CasteTable" />
                    <CasteTable />
                  </>
                }
              />
              <Route
                path="/ReligionTable"
                element={
                  <>
                    <PageTitle title="ReligionTable" />
                    <ReligionTable />
                  </>
                }
              />
              <Route
                path="/PlaceOfBirthList"
                element={
                  <>
                    <PageTitle title="PlaceOfBirthList" />
                    <PlaceOfBirthList />
                  </>
                }
              />
              <Route
                path="/DasaBalanceList"
                element={
                  <>
                    <PageTitle title="DasaBalanceList" />
                    <DasaBalanceList />
                  </>
                }
              />
              <Route
                path="/LagnamList"
                element={
                  <>
                    <PageTitle title="LagnamList" />
                    <LagnamList />
                  </>
                }
              />
              <Route
                path="/RasiList"
                element={
                  <>
                    <PageTitle title="RasiList" />
                    <RasiList />
                  </>
                }
              />
              <Route
                path="/BirthStarList"
                element={
                  <>
                    <PageTitle title="BirthStarList" />
                    <BirthStarList />
                  </>
                }
              />
              <Route
                path="/ProfileholderTable"
                element={
                  <>
                    <PageTitle title="ProfileholderTable" />
                    <ProfileholderTable />
                  </>
                }
              />
              <Route
                path="/ParentsoccupationTable"
                element={
                  <>
                    <PageTitle title="ParentsoccupationTable" />
                    <ParentsoccupationTable />
                  </>
                }
              />
              <Route
                path="/HighesteducationsTable"
                element={
                  <>
                    <PageTitle title="HighesteducationsTable" />
                    <HighesteducationsTable />
                  </>
                }
              />
              <Route
                path="/UgdegreeTable"
                element={
                  <>
                    <PageTitle title="UgdegreeTable" />
                    <UgdegreeTable />
                  </>
                }
              />
              <Route
                path="/AnnualincomesTable"
                element={
                  <>
                    <PageTitle title="AnnualincomesTable" />
                    <AnnualincomesTable />
                  </>
                }
              />
            
              <Route
                path="/ProfileForm"
                element={
                  <>
                    <PageTitle title="ProfileForm" />
                    <ProfileForm />
                  </>
                }
              />
              
            </Routes>
          </DefaultLayout>
        }
      />
    </Routes>
  );
}

export default App;