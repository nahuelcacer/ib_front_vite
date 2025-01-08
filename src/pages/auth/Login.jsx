import React, { useEffect } from "react";

import { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../service/service.login";
import LoadingButton from "../../components/LoadingButton";
import { Button, Input, Select, SelectItem, Spinner } from "@nextui-org/react";
import { getInstitutions } from "../../service/service.instituions";
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { asyncSetInstitutions } from "../../features/institutions/institutions.slices";
import authService from "../../service/auth";

function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [institutions, setInstitutions] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate();
      
  const handleLogin = async (e) => {
    setLoading(true);
    try {
      const data = await login(formData.username, formData.password, formData.institution)
      const token = authService.getToken()
      if (token) {  
        dispatch(asyncSetInstitutions())
        window.location.href = '/'
      } else {
        throw new Error('No se pudo obtener el token después del login');
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const data = await getInstitutions(); // Assume this is an API call
        console.log("Instituciones cargadas:", data);
        setInstitutions(data);
      } catch (error) {
        console.error("Failed to fetch institutions:", error);
      }
    };

    fetchInstitutions();
  }, [])

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium text-center">Iniciar Sesión</h3>

      <div className="space-y-4">
        <Input
          label="Usuario"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="username"
        ></Input>
        <Input
          type="password"
          label="Contraseña"
          onChange={(e) =>
            setFormData({ ...formData, [e.target.name]: e.target.value })
          }
          name="password"
        ></Input>
        <Select
          label="Institución"
          placeholder="Selecciona una institución"
          name="institution"
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
        >
          {institutions?.map((ins) => (
            <SelectItem key={ins.id} value={ins.id}>
              {ins.nombre}
            </SelectItem>
          ))}
        </Select>
        <LoadingButton text={'Iniciar sesión'} onClick={handleLogin} loading={loading}></LoadingButton>
      </div>

      <p className="text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link to="/auth/register" className="text-gray-800 hover:text-gray-600">
          Regístrate
        </Link>
      </p>
    </div>
  );
}

export default Login;
