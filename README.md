# Sistema de Gestión de Contratos Inteligentes para Seguros

## Descripción
En una red blockchain, se busca facilitar y garantizar la transparencia en la gestión de seguros para propiedades inmobiliarias. Los diferentes actores en la red pueden interactuar con el contrato inteligente para gestionar y verificar las pólizas de seguro.

## Roles

### Aseguradora (insurer)
- Crear nuevas pólizas de seguro.
- Modificar condiciones de pólizas existentes.
- Validar y aprobar reclamaciones de seguros.
- Acceso a historiales de pólizas y reclamaciones.

### Cliente (customer)
- Ver información de sus pólizas de seguro.
- Presentar reclamaciones de seguros.
- Ver estado de reclamaciones presentadas.

### Agente de Seguros (insurance_agent)
- Crear nuevas pólizas de seguro en nombre de la aseguradora.
- Modificar condiciones de pólizas existentes con autorización.
- Acceso a historiales de pólizas y reclamaciones de sus clientes.

### Tasador (appraiser)
- Evaluar y registrar el valor de las propiedades.
- Actualizar el valor de las propiedades cuando sea necesario.
- Acceso a historial de evaluaciones realizadas.

### Auditor
- Acceso de lectura a todas las pólizas, reclamaciones, y evaluaciones en la red para auditoría y cumplimiento.

## Contrato Inteligente (auditor)

El contrato inteligente gestionará la creación, modificación y consulta de pólizas de seguro, así como la presentación y aprobación de reclamaciones. También gestionará la evaluación y registro del valor de las propiedades. Las funciones del contrato inteligente deberían validar el rol del invocador para asegurar que tienen los permisos adecuados para ejecutar cada operación.




