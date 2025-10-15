"use client"

import { useState, useEffect } from "react"
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Alert,
  MenuItem,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import AddIcon from "@mui/icons-material/Add"

export default function HealthyPrices() {
  const [prices, setPrices] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [openDialog, setOpenDialog] = useState(false)
  const [editingPlan, setEditingPlan] = useState(null)
  const [formData, setFormData] = useState({
    plan: "monthly",
    price_cents: "",
  })

  const API_BASE = import.meta.env.VITE_API_BASE_ADMIN

  // Automatically fetch plans when the component loads
  useEffect(() => {
    fetchPrices()
  }, [])

  // Retrieve token from localStorage if available
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token")
    return token ? { Authorization: `Bearer ${token}` } : {}
  }

  // Fetch all available subscription prices
  const fetchPrices = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE}/healthy-subscriptions`, {
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
      })

      if (!response.ok) {
        const err = await response.json().catch(() => null)
        throw new Error(err?.details || err?.message || "Failed to fetch subscription prices")
      }

      const data = await response.json()
      setPrices(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    } finally {
      setLoading(false)
    }
  }

  // Open the dialog either for creating or editing a plan
  const handleOpenDialog = (plan) => {
    if (plan) {
      // Editing existing plan
      setEditingPlan(plan)
      setFormData({
        plan,
        price_cents: prices[plan] || "",
      })
    } else {
      // Creating a new plan
      setEditingPlan(null)
      setFormData({
        plan: "monthly",
        price_cents: "",
      })
    }
    setOpenDialog(true)
  }

  // Close the dialog
  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingPlan(null)
  }

  // Handle plan creation or update
  const handleSubmit = async () => {
    try {
      const response = await fetch(`${API_BASE}/healthy-subscriptions`, {
        method: "POST", // Backend handles create/update the same way
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          plan: formData.plan,
          price_cents: Number(formData.price_cents),
        }),
      })

      if (!response.ok) {
        const err = await response.json().catch(() => null)
        throw new Error(err?.error || err?.message || "Failed to save subscription price")
      }

      handleCloseDialog()
      fetchPrices()
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  // Format cents into readable USD
  const formatPrice = (cents) => `$${(cents / 100).toFixed(2)}`

  // Format plan name to start with a capital letter
  const getPlanLabel = (plan) => plan.charAt(0).toUpperCase() + plan.slice(1)

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
        <CircularProgress />
      </Box>
    )
  }

  const planEntries = Object.entries(prices)

  return (
    <Box>
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      {/* Header + Add Button */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <h2 className="text-2xl font-semibold text-foreground">Subscription Prices</h2>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
          sx={{ bgcolor: "primary.main" }}
        >
          Add Plan
        </Button>
      </Box>

      {/* Table Section */}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Plan Type</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Price</TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {planEntries.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center" sx={{ py: 4 }}>
                  <p className="text-muted-foreground">No subscription plans found. Create your first one!</p>
                </TableCell>
              </TableRow>
            ) : (
              planEntries.map(([plan, price]) => (
                <TableRow key={plan} hover>
                  <TableCell sx={{ fontWeight: 500 }}>{getPlanLabel(plan)}</TableCell>
                  <TableCell sx={{ fontSize: "1.1rem", fontWeight: 600, color: "primary.main" }}>
                    {formatPrice(price)}
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleOpenDialog(plan)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog for Add/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{editingPlan ? "Edit Subscription Plan" : "Add Subscription Plan"}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 2 }}>
            <TextField
              select
              label="Plan Type"
              value={formData.plan}
              onChange={(e) => setFormData({ ...formData, plan: e.target.value })}
              fullWidth
              required
              disabled={!!editingPlan}
            >
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
            </TextField>

            <TextField
              label="Price (in cents)"
              type="number"
              value={formData.price_cents}
              onChange={(e) => setFormData({ ...formData, price_cents: e.target.value })}
              fullWidth
              required
              helperText="Enter price in cents (e.g., 9999 for $99.99)"
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={!formData.plan || !formData.price_cents}
          >
            {editingPlan ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
