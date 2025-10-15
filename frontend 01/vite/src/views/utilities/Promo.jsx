"use client"

import { useState, useEffect } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import TextField from "@mui/material/TextField"
import CircularProgress from "@mui/material/CircularProgress"
import Alert from "@mui/material/Alert"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import AddIcon from "@mui/icons-material/Add"

export default function PromosManagement() {
  const [promos, setPromos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPromo, setEditingPromo] = useState(null)
  const [formData, setFormData] = useState({
    type: "",
    value: "",
    valid_from: "",
    valid_to: "",
  })

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN

  useEffect(() => {
    fetchPromos()
  }, [])

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  const fetchPromos = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/promos`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to fetch promotions")
      const data = await response.json()
      setPromos(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleOpenDialog = (promo) => {
    if (promo) {
      setEditingPromo(promo)
      setFormData({
        type: promo.type,
        value: promo.value,
        valid_from: promo.valid_from ? promo.valid_from.split("T")[0] : "",
        valid_to: promo.valid_to ? promo.valid_to.split("T")[0] : "",
      })
    } else {
      setEditingPromo(null)
      setFormData({
        type: "",
        value: "",
        valid_from: "",
        valid_to: "",
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPromo(null)
  }

  const handleSubmit = async () => {
    try {
      const url = editingPromo ? `${API_BASE}/promos/${editingPromo.id}` : `${API_BASE}/promos`
      const method = editingPromo ? "PATCH" : "POST"

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          ...formData,
          value: Number(formData.value),
        }),
      })

      if (!response.ok) throw new Error("Failed to save promotion")

      handleCloseDialog()
      fetchPromos()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this promotion?")) return

    try {
      const response = await fetch(`${API_BASE}/promos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })
      if (!response.ok) throw new Error("Failed to delete promotion")
      fetchPromos()
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    }
  }

  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString()
  }

  const formatValue = (value) => `${value}%`

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold text-foreground">Promotions Management</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: "primary.main" }}
        >
          Add Promotion
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Value</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Valid From</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Valid To</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promos.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                  <p className="text-muted-foreground">No promotions found. Create your first promotion!</p>
                </TableCell>
              </TableRow>
            ) : (
              promos.map((promo) => (
                <TableRow key={promo.id} hover>
                  <TableCell>
                    <span style={{ textTransform: "capitalize" }}>{promo.type}</span>
                  </TableCell>
                  <TableCell>{formatValue(promo.value)}</TableCell>
                  <TableCell>{formatDate(promo.valid_from)}</TableCell>
                  <TableCell>{formatDate(promo.valid_to)}</TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(promo)} sx={{ mr: 1 }}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" onClick={() => handleDelete(promo.id)} color="error">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPromo ? "Edit Promotion" : "Add Promotion"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              label="Type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              fullWidth
              required
            />
            <TextField
              label="Percentage Value"
              type="number"
              value={formData.value}
              onChange={(e) => setFormData({ ...formData, value: e.target.value })}
              fullWidth
              required
              InputProps={{
                endAdornment: <span style={{ marginLeft: 4 }}>%</span>,
              }}
              helperText="Enter the discount percentage (e.g., 20 for 20%)"
            />
            <TextField
              label="Valid From"
              type="date"
              value={formData.valid_from}
              onChange={(e) => setFormData({ ...formData, valid_from: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Valid To"
              type="date"
              value={formData.valid_to}
              onChange={(e) => setFormData({ ...formData, valid_to: e.target.value })}
              fullWidth
              required
              InputLabelProps={{ shrink: true }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.type || !formData.value || !formData.valid_from || !formData.valid_to}
          >
            {editingPromo ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
